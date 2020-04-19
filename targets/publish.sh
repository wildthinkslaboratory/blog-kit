# publish.sh targetName [optionalTargetRepo] [--org] [--remote]
#
# Parameters:
#   targetName: cb, sparrow, etc or '--all'
#   optionalTargetRepo: repo URL or ""
#   '--org': Use root of target repo and use master branch
#
# Examples:
# 1) ./publish.sh cb
# 2) ./publish.sh cb git@github.com:DoctorBud/blog-kit-test-target.git
# 3) ./publish.sh cb github.com:smartdown/smartdown.github.io.git --org
# 4) ./publish.sh cb "" --org # Should be same as (3) above
# 5) ./publish.sh --all
# 6) ./publish.sh --all git@github.com:DoctorBud/blog-kit-test-target.git
# 7) ./publish.sh --all github.com:smartdown/smartdown.github.io.git --org
# 8) ./publish.sh --all "" --org # Should be same as (3) above

here=${0%/*}
source ${here}/functions.sh

if [ "$1" == "" ]; then
    echo "# $0 usage: $0 targetName [optionalTargetRepo] [--org] [--remote]"
    exit 1
fi

if [[ "$1" == "--all" && "$4" == "--remote" ]]; then
    echo "# $0 usage: $0 targetName [optionalTargetRepo] [--org] [--remote]"
    echo "# The '--all' and '--remote' options cannot be used together."
    exit 1
fi

targetName="${1}"

repoUrl=`git remote get-url --push origin`
parseRepoUrl $repoUrl;

echo "#"
echo "# $0 \"$1\" \"$2\" \"$3\""
echo "#"
echo "repoUrl: $repoUrl"
echo "repoPrefix: $repoPrefix"
echo "repoOrg: $repoOrg"
echo "repoName: $repoName"

targetBranch="gh-pages"
targetRepoUrl=$repoUrl
targetBaseUrl="/${repoName}/"
if [ "$2" != "" ]; then
    targetRepoUrl="$2"
    parseRepoUrl $targetRepoUrl;
    targetBaseUrl="/${repoName}/"

    echo "xrepoUrl: $repoUrl"
    echo "xrepoPrefix: $repoPrefix"
    echo "xrepoOrg: $repoOrg"
    echo "xrepoName: $repoName"
fi

if [ "$3" == "--org" ]; then
    targetRepoUrl="${repoPrefix}${repoOrg}/${repoOrg}.github.io.git"
    targetBaseUrl="/"
    targetBranch="master"
fi

echo "targetName: $targetName"
echo "targetRepoUrl: $targetRepoUrl"
echo "targetBaseUrl: $targetBaseUrl"
echo "targetBranch: $targetBranch"
blogRoots="/tmp/blogRoots"


if [ "$targetName" == "--all" ]; then
    ${here}/build.sh alembic ${targetBaseUrl}alembic $4 || exit 1
    ${here}/build.sh cb ${targetBaseUrl}cb $4 || exit 1
    ${here}/build.sh legacy ${targetBaseUrl}legacy $4 || exit 1
    ${here}/build.sh mm ${targetBaseUrl}mm $4 || exit 1
    ${here}/build.sh sparrow ${targetBaseUrl}sparrow $4 || exit 1

    rm -rf ${blogRoots}
    mkdir -p ${blogRoots}

    cp -r ${here}/alembic/_site/ ${blogRoots}/alembic
    cp -r ${here}/cb/_site/ ${blogRoots}/cb
    cp -r ${here}/legacy/_site/ ${blogRoots}/legacy
    cp -r ${here}/mm/_site/ ${blogRoots}/mm
    cp -r ${here}/sparrow/_site/ ${blogRoots}/sparrow

    cp ${here}/index.html ${blogRoots}/index.html
    touch ${blogRoots}/.nojekyll
    cd ${blogRoots}
else

    # Single-target
    target="${here}/${targetName}"
    if [[ ! -d ${target} ]]; then
        echo "The target ${target} does not exist!"
        exit 1
    fi

    # Adjust target directory to look like a Jekyll site
    ${here}/sync.sh ${targetName}

    dist="${blogRoots}/${targetName}"

    ${here}/build.sh ${targetName} ${targetBaseUrl} $4 || exit 1

    mkdir -p ${blogRoots}
    rm -rf ${blogRoots}/.git

    cd ${target}
    rm -rf ${dist}
    cp -RP _site/ ${dist}
    cd ${dist}
fi

# echo "# serve `pwd`"

# if [ "$targetBaseUrl" != "/" ]; then
#   ln -s . .${targetBaseUrl%?}
# fi
# echo "# Open url: https://127.0.0.1:8989${targetBaseUrl}"
# ls -la
# htp . 8989

git init
git config core.symlinks true
git add .
git commit -m "Initial commit"
git remote add origin ${targetRepoUrl}
git push --force origin master:${targetBranch}


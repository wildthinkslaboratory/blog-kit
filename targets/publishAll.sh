export here=${0%/*}
source ${here}/functions.sh


repoUrl=`git remote get-url --push origin`
parseRepoUrl $repoUrl;

echo "repoUrl: $repoUrl"
echo "repoPrefix: $repoPrefix"
echo "repoOrg: $repoOrg"
echo "repoName: $repoName"

baseUrl="/${repoName}"

${here}/build.sh cb ${baseUrl}/cb
${here}/build.sh legacy ${baseUrl}/legacy
${here}/build.sh mm ${baseUrl}/mm
${here}/build.sh alembic ${baseUrl}/alembic
${here}/build.sh sparrow ${baseUrl}/sparrow


blogRoots="/tmp/blogRoots"

rm -rf ${blogRoots}
mkdir -p ${blogRoots}

cp -r ${here}/cb/_site/ ${blogRoots}/cb
cp -r ${here}/legacy/_site/ ${blogRoots}/legacy
cp -r ${here}/mm/_site/ ${blogRoots}/mm
cp -r ${here}/alembic/_site/ ${blogRoots}/alembic
cp -r ${here}/sparrow/_site/ ${blogRoots}/sparrow

cp ${here}/index.html ${blogRoots}/index.html
touch ${blogRoots}/.nojekyll

cd ${blogRoots}


# ln -s . .${baseUrl}
# echo "# Open url: https://127.0.0.1:8989${baseUrl}"
# htp . 8989


git init
git add .
git commit -m "Initial commit"
git remote add origin ${repoUrl}
git push --force origin master:gh-pages

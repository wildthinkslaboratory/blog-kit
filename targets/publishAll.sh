export here=${0%/*}
remoteRepo=`git remote get-url --push origin`

if [[ $remoteRepo =~ ^([^/]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
	rootUrl="/${BASH_REMATCH[2]}"
else
	echo "# Unable to compute rootUrl from remoteRepo: $remoteRepo"
	exit 1
fi

${here}/build.sh cb ${rootUrl}/cb
${here}/build.sh legacy ${rootUrl}/legacy
${here}/build.sh mm ${rootUrl}/mm
${here}/build.sh alembic ${rootUrl}/alembic
${here}/build.sh sparrow ${rootUrl}/sparrow

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

git init
git add .
git commit -m "Initial commit"
git remote add origin ${remoteRepo}
git push --force origin master:gh-pages

# publishAllToOrgRoot.sh

export here=${0%/*}

remoteRepo=`git remote get-url --push origin`
if [[ $remoteRepo =~ ^([^:]+):([^/]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
	echo "BASH_REMATCH: ${BASH_REMATCH[2]} ...  ${BASH_REMATCH[3]}"
	ghPrefix=${BASH_REMATCH[1]}
	orgName=${BASH_REMATCH[2]}
	orgRemoteRepo="${ghPrefix}:${orgName}/${orgName}.github.io.git"
else
	echo "# Unable to compute baseUrl from remoteRepo: $remoteRepo"
	exit 1
fi


${here}/build.sh cb /cb
${here}/build.sh legacy /legacy
${here}/build.sh mm /mm
${here}/build.sh alembic /alembic
${here}/build.sh sparrow /sparrow

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
git remote add origin ${orgRemoteRepo}
git push --force origin master:master

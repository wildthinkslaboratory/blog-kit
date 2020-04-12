
# git@github.com:smartdown/blog-kit.git
# https://github.com/smartdown/blog-kit.git

parseRepoUrl() {
	repoUrl=$1
	if [[ $1 =~ ^([^:]+):([^/]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
		repoPrefix="${BASH_REMATCH[1]}:"
		repoOrg=${BASH_REMATCH[2]}
		repoName=${BASH_REMATCH[3]}
	elif [[ $1 =~ ^(https://[^/]+)/([[:alpha:]\.\-]+)/([[:alpha:]\.\-]+)\.git$ ]]; then
		repoPrefix="${BASH_REMATCH[1]}/"
		repoOrg=${BASH_REMATCH[2]}
		repoName=${BASH_REMATCH[3]}
	else
		echo "# Unable to compute baseUrl from repoUrl: $1"
		exit 1
	fi
}


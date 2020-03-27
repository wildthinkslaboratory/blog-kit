export here=${0%/*}
if [ "$1" == "" ]; then
    echo "# $0 usage: $0 targetName"
    exit 1
fi

export targetName="${1}"
export target="${here}/${targetName}"

if [[ ! -d ${target} ]]; then
	echo "The target ${target} does not exist!"
	exit 1
fi

# Adjust target directory to look like a Jekyll site
${here}/sync.sh ${targetName}

cd ${target}

rm -rf _site/
mkdir _site/

syncChanges() {
	echo "+++ syncChanges"
	cp -v -r ../../_pages/* _pages/
	cp -v -r ../../_posts/* _posts/
	echo "--- syncChanges"
}


syncThemeChanges() {
	echo "+++ syncThemeChanges"
	if [[ -d _theme_posts ]]; then
		cp -v -r _theme_posts/* _posts/
	fi
	if [[ -d _theme_pages ]]; then
		cp -v -r _theme_pages/* _pages/
	fi
	if [[ -d _theme_assets ]]; then
		cp -v -r _theme_assets/* assets/
	fi
	echo "--- syncThemeChanges"
}

trap "kill 0" EXIT
(fswatch -o ../../_posts ../../_pages | while read f; do syncChanges; done) &
(fswatch -o _theme_pages _theme_posts _theme_assets | while read g; do syncThemeChanges; done) &

bundle exec jekyll serve

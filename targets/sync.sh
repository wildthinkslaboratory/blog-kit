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

cd ${target}

rm -rf _posts
if [[ -d _theme_posts ]]; then
	cp -r _theme_posts _posts
else
	mkdir _posts
fi
cp -r ../../_posts/* _posts/


rm -rf _pages
if [[ -d _theme_pages ]]; then
	cp -r _theme_pages _pages
else
	mkdir _pages
fi
cp -r ../../_pages/* _pages/


rm -rf assets
if [[ -d _theme_assets ]]; then
	cp -r _theme_assets assets
else
	mkdir assets
fi
cp -r ../../assets/* assets/


rm -rf _rawposts
rm -rf _rawpages
ln -s _posts _rawposts
ln -s _pages _rawpages

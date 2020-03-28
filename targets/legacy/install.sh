# Script to install vendor dependencies for the legacy theme

npm install

rm -rf _sass
mkdir _sass
cp -r node_modules/font-awesome/scss/ ./_sass/font-awesome
cp -r node_modules/bootstrap-sass/assets/stylesheets/ _sass/bootstrap-sass/

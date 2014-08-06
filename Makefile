#!/usr/bin/make -f

all: screen.css min-exists.js index.html
	cp stylesheets/screen.css \
	/Users/alexd/Dropbox/sites/alexdunn/static/exists/stylesheets
	cp scripts/min-exists.js \
	/Users/alexd/Dropbox/sites/alexdunn/static/exists/scripts
	cp index.html \
	/Users/alexd/Dropbox/sites/alexdunn/static/exists/	

screen.css: sass/_normalize.scss sass/screen.scss
	compass compile -e production --force
	
min-exists.js: scripts/exists.js
	closure-compiler \
	--charset utf-8 \
	--js scripts/exists.js \
	--js_output_file scripts/min-exists.js
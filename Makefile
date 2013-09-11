
build: components lib/marked.js marked.css
	@component build --dev
	@touch build

start:
	@component serve &

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean start

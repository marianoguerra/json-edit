#!/usr/bin/env sh

cat \
    generators/javascript.js \
    generators/javascript/control.js \
    generators/javascript/logic.js \
    generators/javascript/math.js \
    generators/javascript/text.js \
    generators/javascript/lists.js \
    generators/javascript/variables.js \
    generators/javascript/procedures.js \
    > jsgenerator.js

uglifyjs jsgenerator.js > jsgenerator.min.js

cat \
    language/en/_messages.js \
    language/common/control.js \
    language/common/logic.js \
    language/common/math.js \
    language/common/text.js \
    language/common/lists.js \
    language/common/variables.js \
    language/common/procedures.js \
    > langcommon.js 

uglifyjs langcommon.js > langcommon.min.js
uglifyjs language.js > language.min.js
uglifyjs picker.js > picker.min.js

cat blockly_compressed.js jsgenerator.min.js langcommon.min.js picker.min.js language.min.js > eflang.min.js


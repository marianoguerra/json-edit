/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
if (!Blockly.JavaScript.RESERVED_WORDS_) {
  Blockly.JavaScript.RESERVED_WORDS_ = '';
}

Blockly.JavaScript.RESERVED_WORDS_ +=
    'Blockly', // In case JS is evaled in the current window.
    // https://developer.mozilla.org/en/JavaScript/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan,';

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
 */
Blockly.JavaScript.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.JavaScript.ORDER_MEMBER = 1;         // . []
Blockly.JavaScript.ORDER_NEW = 1;            // new
Blockly.JavaScript.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.JavaScript.ORDER_INCREMENT = 3;      // ++
Blockly.JavaScript.ORDER_DECREMENT = 3;      // --
Blockly.JavaScript.ORDER_LOGICAL_NOT = 4;    // !
Blockly.JavaScript.ORDER_BITWISE_NOT = 4;    // ~
Blockly.JavaScript.ORDER_UNARY_PLUS = 4;     // +
Blockly.JavaScript.ORDER_UNARY_NEGATION = 4; // -
Blockly.JavaScript.ORDER_TYPEOF = 4;         // typeof
Blockly.JavaScript.ORDER_VOID = 4;           // void
Blockly.JavaScript.ORDER_DELETE = 4;         // delete
Blockly.JavaScript.ORDER_MULTIPLICATION = 5; // *
Blockly.JavaScript.ORDER_DIVISION = 5;       // /
Blockly.JavaScript.ORDER_MODULUS = 5;        // %
Blockly.JavaScript.ORDER_ADDITION = 6;       // +
Blockly.JavaScript.ORDER_SUBTRACTION = 6;    // -
Blockly.JavaScript.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.JavaScript.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.JavaScript.ORDER_IN = 8;             // in
Blockly.JavaScript.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.JavaScript.ORDER_EQUALITY = 9;       // == != === !==
Blockly.JavaScript.ORDER_BITWISE_AND = 10;   // &
Blockly.JavaScript.ORDER_BITWISE_XOR = 11;   // ^
Blockly.JavaScript.ORDER_BITWISE_OR = 12;    // |
Blockly.JavaScript.ORDER_LOGICAL_AND = 13;   // &&
Blockly.JavaScript.ORDER_LOGICAL_OR = 14;    // ||
Blockly.JavaScript.ORDER_CONDITIONAL = 15;   // ?:
Blockly.JavaScript.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.JavaScript.ORDER_COMMA = 17;         // ,
Blockly.JavaScript.ORDER_NONE = 99;          // (...)

/**
 * Initialise the database of variable names.
 */
Blockly.JavaScript.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.JavaScript.definitions_ = {};

  if (Blockly.Variables) {
    if (!Blockly.JavaScript.variableDB_) {
      Blockly.JavaScript.variableDB_ =
          new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_);
    } else {
      Blockly.JavaScript.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = 'var ' +
          Blockly.JavaScript.variableDB_.getDistinctName(variables[x],
          Blockly.Variables.NAME_TYPE) + ';';
    }
    Blockly.JavaScript.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.JavaScript.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.JavaScript.definitions_) {
    definitions.push(Blockly.JavaScript.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.JavaScript.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped JavaScript string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} JavaScript string.
 * @private
 */
Blockly.JavaScript.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating JavaScript from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The JavaScript code created for this block.
 * @return {string} JavaScript code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.JavaScript.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Generator.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Generator.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Generator.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for control blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
  var code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.JavaScript.valueToCode(this, 'IF' + n,
        Blockly.JavaScript.ORDER_NONE) || 'false';
    branch = Blockly.JavaScript.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.JavaScript.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

Blockly.JavaScript.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getTitleValue('MODE') == 'UNTIL';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL',
      until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
      Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch0 + '}\n';
};

Blockly.JavaScript.controls_for = function() {
  // For loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0 + (up ? '++' : '--') + ') {\n' +
        branch0 + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 +
        ' += (' + startVar + ' <= ' + endVar + ') ? 1 : -1) {\n' +
        branch0 + '}\n';
  }
  return code;
};

Blockly.JavaScript.controls_forEach = function() {
  // For each loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'LIST',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var branch0 = Blockly.JavaScript.statementToCode(this, 'DO');
  var code;
  var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  if (argument0.match(/^\w+$/)) {
    branch0 = '  ' + variable0 + ' = ' + argument0 + '[' + indexVar + '];\n' +
        branch0;
    code = 'for (var ' + indexVar + ' in  ' + argument0 + ') {\n' +
        branch0 + '}\n';
  } else {
    // The list appears to be more complicated than a simple variable.
    // Cache it to a variable to prevent repeated look-ups.
    var listVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    branch0 = '  ' + variable0 + ' = ' + listVar + '[' + indexVar + '];\n' +
        branch0;
    code = 'var ' + listVar + ' = ' + argument0 + ';\n' +
        'for (var ' + indexVar + ' in ' + listVar + ') {\n' +
        branch0 + '}\n';
  }
  return code;
};

Blockly.JavaScript.controls_flow_statements = function() {
  // Flow statements: continue, break.
  switch (this.getTitleValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.JavaScript.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.JavaScript.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || 'false';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || 'false';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript.logic_negate = function() {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'BOOL', order) ||
      'false';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for math blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getTitleValue('NUM'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getTitleValue('OP');
  var tuple = Blockly.JavaScript.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'B', order) || '0';
  var code;
  // Power in JavaScript requires a special case since it has no operator.
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.JavaScript.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
  MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
  MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
  DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
  POWER: [null, Blockly.JavaScript.ORDER_COMMA]  // Handle power separately.
};

Blockly.JavaScript.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'DELTA',
      Blockly.JavaScript.ORDER_ADDITION) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = (typeof ' + varName + ' == \'number\' ? ' + varName +
      ' : 0) + ' + argument0 + ';\n';
};

Blockly.JavaScript.math_single = function() {
  // Math operators with single operand.
  var operator = this.getTitleValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] == '-') {
      // --3 is not legal in JS.
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, Blockly.JavaScript.ORDER_UNARY_NEGATION];
  }
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'Math.abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'Math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'Math.log(' + arg + ')';
      break;
    case 'EXP':
      code = 'Math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'Math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'Math.round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'Math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'Math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'Math.sin(' + arg + ' / 180 * Math.PI)';
      break;
    case 'COS':
      code = 'Math.cos(' + arg + ' / 180 * Math.PI)';
      break;
    case 'TAN':
      code = 'Math.tan(' + arg + ' / 180 * Math.PI)';
      break;
  }
  if (code) {
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'LOG10':
      code = 'Math.log(' + arg + ') / Math.log(10)';
      break;
    case 'ASIN':
      code = 'Math.asin(' + arg + ') / Math.PI * 180';
      break;
    case 'ACOS':
      code = 'Math.acos(' + arg + ') / Math.PI * 180';
      break;
    case 'ATAN':
      code = 'Math.atan(' + arg + ') / Math.PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.JavaScript.ORDER_DIVISION];
};

// Rounding functions have a single operand.
Blockly.JavaScript.math_round = Blockly.JavaScript.math_single;
// Trigonometry functions have a single operand.
Blockly.JavaScript.math_trig = Blockly.JavaScript.math_single;

Blockly.JavaScript.math_on_list = function() {
  // Math functions for lists.
  var func = this.getTitleValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.min.apply(null, ' + list + ')';
      break;
    case 'MAX':
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.max.apply(null, ' + list + ')';
      break;
    case 'AVERAGE':
      // math_median([null,null,1,3]) == 2.0.
      if (!Blockly.JavaScript.definitions_['math_mean']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_mean', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_mean = functionName;
        var func = [];
        func.push('function ' + functionName + '(myList) {');
        func.push('  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;');
        func.push('}');
        Blockly.JavaScript.definitions_['math_mean'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_mean + '(' + list + ')';
      break;
    case 'MEDIAN':
      // math_median([null,null,1,3]) == 2.0.
      if (!Blockly.JavaScript.definitions_['math_median']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_median', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_median = functionName;
        var func = [];
        func.push('function ' + functionName + '(myList) {');
        func.push('  var localList = myList.filter(function (x) ' +
                  '{return typeof x == \'number\';});');
        func.push('  if (!localList.length) return null;');
        func.push('  localList.sort(function(a, b) {return b - a;});');
        func.push('  if (localList.length % 2 == 0) {');
        func.push('    return (localList[localList.length / 2 - 1] + ' +
                  'localList[localList.length / 2]) / 2;');
        func.push('  } else {');
        func.push('    return localList[(localList.length - 1) / 2];');
        func.push('  }');
        func.push('}');
        Blockly.JavaScript.definitions_['math_median'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_median + '(' + list + ')';
      break;
    case 'MODE':
      if (!Blockly.JavaScript.definitions_['math_modes']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_modes', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_modes = functionName;
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var func = [];
        func.push('function ' + functionName + '(values) {');
        func.push('  var modes = [];');
        func.push('  var counts = [];');
        func.push('  var maxCount = 0;');
        func.push('  for (var i = 0; i < values.length; i++) {');
        func.push('    var value = values[i];');
        func.push('    var found = false;');
        func.push('    var thisCount;');
        func.push('    for (var j = 0; j < counts.length; j++) {');
        func.push('      if (counts[j][0] === value) {');
        func.push('        thisCount = ++counts[j][1];');
        func.push('        found = true;');
        func.push('        break;');
        func.push('      }');
        func.push('    }');
        func.push('    if (!found) {');
        func.push('      counts.push([value, 1]);');
        func.push('      thisCount = 1;');
        func.push('    }');
        func.push('    maxCount = Math.max(thisCount, maxCount);');
        func.push('  }');
        func.push('  for (var j = 0; j < counts.length; j++) {');
        func.push('    if (counts[j][1] == maxCount) {');
        func.push('        modes.push(counts[j][0]);');
        func.push('    }');
        func.push('  }');
        func.push('  return modes;');
        func.push('}');
        Blockly.JavaScript.definitions_['math_modes'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      if (!Blockly.JavaScript.definitions_['math_standard_deviation']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('function ' + functionName + '(numbers) {');
        func.push('  var n = numbers.length;');
        func.push('  if (!n) return null;');
        func.push('  var mean = numbers.reduce(function(x, y) ' +
                  '{return x + y;}) / n;');
        func.push('  var variance = 0;');
        func.push('  for (var j = 0; j < n; j++) {');
        func.push('    variance += Math.pow(numbers[j] - mean, 2);');
        func.push('  }');
        func.push('  variance = variance / n;');
        func.push('  return Math.sqrt(variance);');
        func.push('}');
        Blockly.JavaScript.definitions_['math_standard_deviation'] =
            func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_standard_deviation +
          '(' + list + ')';
      break;
    case 'RANDOM':
      if (!Blockly.JavaScript.definitions_['math_random_item']) {
        var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
            'math_random_item', Blockly.Generator.NAME_TYPE);
        Blockly.JavaScript.math_on_list.math_random_item = functionName;
        var func = [];
        func.push('function ' + functionName + '(list) {');
        func.push('  var x = Math.floor(Math.random() * list.length);');
        func.push('  return list[x];');
        func.push('}');
        Blockly.JavaScript.definitions_['math_random_item'] = func.join('\n');
      }
      list = Blockly.JavaScript.valueToCode(this, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = Blockly.JavaScript.math_on_list.math_random_item +
          '(' + list + ')';
      break;
    default:
      throw 'Unknown operator: ' + func;
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'LOW',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'HIGH',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var code = 'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' +
      argument2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'DIVIDEND',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'DIVISOR',
      Blockly.JavaScript.ORDER_MODULUS) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript.math_random_int = function() {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FROM',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  if (!Blockly.JavaScript.definitions_['math_random_int']) {
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'math_random_int', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.math_random_int.random_function = functionName;
    var func = [];
    func.push('function ' + functionName + '(a, b) {');
    func.push('  if (a > b) {');
    func.push('    // Swap a and b to ensure a is smaller.');
    func.push('    var c = a;');
    func.push('    a = b;');
    func.push('    b = c;');
    func.push('  }');
    func.push('  return Math.floor(Math.random() * (b - a + 1) + a);');
    func.push('}');
    Blockly.JavaScript.definitions_['math_random_int'] = func.join('\n');
  }
  var code = Blockly.JavaScript.math_random_int.random_function +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.math_random_float = function() {
  // Random fraction between 0 and 1.
  return ['Math.random()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.text = function() {
  // Text value.
  var code = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text_join = function() {
  // Create a string made up of any number of elements of any type.
  var code;
  if (this.itemCount_ == 0) {
    return ['\'\'', Blockly.JavaScript.ORDER_ATOMIC];
  } else if (this.itemCount_ == 1) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  } else if (this.itemCount_ == 2) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'ADD0',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.JavaScript.valueToCode(this, 'ADD1',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = 'String(' + argument0 + ') + String(' + argument1 + ')';
    return [code, Blockly.JavaScript.ORDER_ADDITION];
  } else {
    code = new Array(this.itemCount_);
    for (var n = 0; n < this.itemCount_; n++) {
      code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
          Blockly.JavaScript.ORDER_COMMA) || '\'\'';
    }
    code = '[' + code.join(',') + '].join(\'\')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  }
};

Blockly.JavaScript.text_append = function() {
  // Append to a variable in place.
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return varName + ' = String(' + varName + ') + String(' + argument0 + ');\n';
};

Blockly.JavaScript.text_length = function() {
  // String length.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  return [argument0 + '.length', Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return ['!' + argument0 + '.length', Blockly.JavaScript.ORDER_LOGICAL_NOT];
};

Blockly.JavaScript.text_endString = function() {
  // Return a leading or trailing substring.
  var first = this.getTitleValue('END') == 'FIRST';
  var code;
  var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
      Blockly.JavaScript.ORDER_COMMA) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  if (first) {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_COMMA) || '1';
    code = argument1 + '.substring(0, ' + argument0 + ')';
  } else {
    var argument0 = Blockly.JavaScript.valueToCode(this, 'NUM',
        Blockly.JavaScript.ORDER_UNARY_NEGATION) || '1';
    if (argument0.match(/^\d+$/) && !argument0.match(/^0+$/)) {
      // Shortcut for a plain positive number.
      code = argument1 + '.slice(-' + argument0 + ')';
    } else {
      code = argument1 + '.slice(- ' + argument0 + ' || Infinity)';
    }
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_indexOf = function() {
  // Search the text for a substring.
  var operator = this.getTitleValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.JavaScript.valueToCode(this, 'FIND',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_charAt = function() {
  // Get letter at index.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_NONE) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  // Blockly uses one-based indicies.
  if (argument0.match(/^-?\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code = argument1 + '[' + argument0 + ']';
  return [code, Blockly.JavaScript.ORDER_MEMBER];
};

Blockly.JavaScript.text_changeCase = function() {
  // Change capitalization.
  var mode = this.getTitleValue('CASE');
  var operator = Blockly.JavaScript.text_changeCase.OPERATORS[mode];
  var code;
  if (operator) {
    // Upper and lower case are functions built into JavaScript.
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
    code = argument0 + operator;
  } else {
    if (!Blockly.JavaScript.definitions_['text_toTitleCase']) {
      // Title case is not a native JavaScript function.  Define one.
      var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
          'text_toTitleCase', Blockly.Generator.NAME_TYPE);
      Blockly.JavaScript.text_changeCase.toTitleCase = functionName;
      var func = [];
      func.push('function ' + functionName + '(str) {');
      func.push('  return str.replace(/\\S+/g,');
      func.push('      function(txt) {return txt[0].toUpperCase() + ' +
                'txt.substring(1).toLowerCase();});');
      func.push('}');
      Blockly.JavaScript.definitions_['text_toTitleCase'] = func.join('\n');
    }
    var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    code = Blockly.JavaScript.text_changeCase.toTitleCase +
        '(' + argument0 + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_changeCase.OPERATORS = {
  UPPERCASE: '.toUpperCase()',
  LOWERCASE: '.toLowerCase()',
  TITLECASE: null
};

Blockly.JavaScript.text_trim = function() {
  // Trim spaces.
  var mode = this.getTitleValue('MODE');
  var operator = Blockly.JavaScript.text_trim.OPERATORS[mode];
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
  return [argument0 + operator, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.text_trim.OPERATORS = {
  LEFT: '.replace(/^\\s+/, \'\')',
  RIGHT: '.replace(/\\s+$/, \'\')',
  BOTH: '.replace(/^\\s+|\\s+$/g, \'\')'
};

Blockly.JavaScript.text_print = function() {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};

Blockly.JavaScript.text_prompt = function() {
  // Prompt function.
  var msg = Blockly.JavaScript.quote_(this.getTitleValue('TEXT'));
  var code = 'window.prompt(' + msg + ')';
  var toNumber = this.getTitleValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'window.parseFloat(' + code + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.lists_create_empty = function() {
  // Create an empty list.
  return ['[]', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_create_with = function() {
  // Create a list with any number of elements of any type.
  var code = new Array(this.itemCount_);
  for (var n = 0; n < this.itemCount_; n++) {
    code[n] = Blockly.JavaScript.valueToCode(this, 'ADD' + n,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lists_repeat = function() {
  // Create a list with one element repeated.
  if (!Blockly.JavaScript.definitions_['lists_repeat']) {
    // Function copied from Closure's goog.array.repeat.
    var functionName = Blockly.JavaScript.variableDB_.getDistinctName(
        'lists_repeat', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.lists_repeat.repeat = functionName;
    var func = [];
    func.push('function ' + functionName + '(value, n) {');
    func.push('  var array = [];');
    func.push('  for (var i = 0; i < n; i++) {');
    func.push('    array[i] = value;');
    func.push('  }');
    func.push('  return array;');
    func.push('}');
    Blockly.JavaScript.definitions_['lists_repeat'] = func.join('\n');
  }
  var argument0 = Blockly.JavaScript.valueToCode(this, 'ITEM',
      Blockly.JavaScript.ORDER_COMMA) || 'null';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'NUM',
      Blockly.JavaScript.ORDER_COMMA) || '0';
  var code = Blockly.JavaScript.lists_repeat.repeat +
      '(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.lists_length = function() {
  // Testing the length of a list is the same as for a string.
  return Blockly.JavaScript.text_length.call(this);
};

Blockly.JavaScript.lists_isEmpty = function() {
  // Testing a list for being empty is the same as for a string.
  return Blockly.JavaScript.text_isEmpty.call(this);
};

Blockly.JavaScript.lists_indexOf = function() {
  // Searching a list for a value is the same as search for a substring.
  return Blockly.JavaScript.text_indexOf.call(this);
};

Blockly.JavaScript.lists_getIndex = function() {
  // Indexing into a list is the same as indexing into a string.
  return Blockly.JavaScript.text_charAt.call(this);
};

Blockly.JavaScript.lists_setIndex = function() {
  // Set element at index.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'AT',
      Blockly.JavaScript.ORDER_NONE) || '1';
  var argument1 = Blockly.JavaScript.valueToCode(this, 'LIST',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var argument2 = Blockly.JavaScript.valueToCode(this, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    argument0 = parseInt(argument0, 10) - 1;
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  return argument1 + '[' + argument0 + '] = ' + argument2 + ';\n';
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.variables_get = function() {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.variables_set = function() {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.procedures_defreturn = function() {
  // Define a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.JavaScript.statementToCode(this, 'STACK');
  var returnValue = Blockly.JavaScript.valueToCode(this, 'RETURN',
      Blockly.JavaScript.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.JavaScript.scrub_(this, code);
  Blockly.JavaScript.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript.procedures_defnoreturn =
    Blockly.JavaScript.procedures_defreturn;

Blockly.JavaScript.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.JavaScript.valueToCode(this, 'ARG' + x,
        Blockly.JavaScript.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.JavaScript.procedures_return = function() {
  // Return value in a procedure
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "return "+value+";\n";
  return code;
};

Blockly.JavaScript.procedures_null = function() {
  // Return nothing
  var code = 'null';
  return [code ,Blockly.JavaScript.ORDER_NONE];
};
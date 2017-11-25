// Generated from lib/html/HTMLParser.g4 by ANTLR 4.6
// jshint ignore: start
var antlr4 = require('antlr4/index');
var HTMLParserListener = require('./HTMLParserListener').HTMLParserListener;
var grammarFileName = "HTMLParser.g4";

var serializedATN = ["\u0003\u0430\ud6d1\u8206\uad2d\u4417\uaef1\u8d80\uaadd",
    "\u0003\u0019\u00ae\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0003\u0002\u0003\u0002\u0007",
    "\u0002\'\n\u0002\f\u0002\u000e\u0002*\u000b\u0002\u0003\u0002\u0005",
    "\u0002-\n\u0002\u0003\u0002\u0003\u0002\u0007\u00021\n\u0002\f\u0002",
    "\u000e\u00024\u000b\u0002\u0003\u0002\u0005\u00027\n\u0002\u0003\u0002",
    "\u0003\u0002\u0007\u0002;\n\u0002\f\u0002\u000e\u0002>\u000b\u0002\u0003",
    "\u0002\u0007\u0002A\n\u0002\f\u0002\u000e\u0002D\u000b\u0002\u0003\u0003",
    "\u0007\u0003G\n\u0003\f\u0003\u000e\u0003J\u000b\u0003\u0003\u0003\u0003",
    "\u0003\u0007\u0003N\n\u0003\f\u0003\u000e\u0003Q\u000b\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0007\u0004V\n\u0004\f\u0004\u000e\u0004Y\u000b",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0007\u0004e",
    "\n\u0004\f\u0004\u000e\u0004h\u000b\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0007\u0004o\n\u0004\f\u0004\u000e\u0004",
    "r\u000b\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0005\u0004y\n\u0004\u0003\u0005\u0005\u0005|\n\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0005\u0005\u0081\n\u0005\u0003\u0005\u0005",
    "\u0005\u0084\n\u0005\u0007\u0005\u0086\n\u0005\f\u0005\u000e\u0005\u0089",
    "\u000b\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006",
    "\u0005\u0006\u0090\n\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0005\u000b\u009c",
    "\n\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e\u0003\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0011\u0003\u0012\u0003\u0012\u0003\u0012\u0003\u0012\u0002\u0002\u0013",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c",
    "\u001e \"\u0002\u0006\u0004\u0002\t\t\r\r\u0003\u0002\u0003\u0004\u0003",
    "\u0002\u0014\u0015\u0003\u0002\u0016\u0017\u00b6\u0002(\u0003\u0002",
    "\u0002\u0002\u0004H\u0003\u0002\u0002\u0002\u0006x\u0003\u0002\u0002",
    "\u0002\b{\u0003\u0002\u0002\u0002\n\u008f\u0003\u0002\u0002\u0002\f",
    "\u0091\u0003\u0002\u0002\u0002\u000e\u0093\u0003\u0002\u0002\u0002\u0010",
    "\u0095\u0003\u0002\u0002\u0002\u0012\u0097\u0003\u0002\u0002\u0002\u0014",
    "\u009b\u0003\u0002\u0002\u0002\u0016\u009d\u0003\u0002\u0002\u0002\u0018",
    "\u009f\u0003\u0002\u0002\u0002\u001a\u00a1\u0003\u0002\u0002\u0002\u001c",
    "\u00a3\u0003\u0002\u0002\u0002\u001e\u00a5\u0003\u0002\u0002\u0002 ",
    "\u00a7\u0003\u0002\u0002\u0002\"\u00aa\u0003\u0002\u0002\u0002$\'\u0005",
    "\u001e\u0010\u0002%\'\u0007\t\u0002\u0002&$\u0003\u0002\u0002\u0002",
    "&%\u0003\u0002\u0002\u0002\'*\u0003\u0002\u0002\u0002(&\u0003\u0002",
    "\u0002\u0002()\u0003\u0002\u0002\u0002),\u0003\u0002\u0002\u0002*(\u0003",
    "\u0002\u0002\u0002+-\u0005\u001c\u000f\u0002,+\u0003\u0002\u0002\u0002",
    ",-\u0003\u0002\u0002\u0002-2\u0003\u0002\u0002\u0002.1\u0005\u001e\u0010",
    "\u0002/1\u0007\t\u0002\u00020.\u0003\u0002\u0002\u00020/\u0003\u0002",
    "\u0002\u000214\u0003\u0002\u0002\u000220\u0003\u0002\u0002\u000223\u0003",
    "\u0002\u0002\u000236\u0003\u0002\u0002\u000242\u0003\u0002\u0002\u0002",
    "57\u0005\u001a\u000e\u000265\u0003\u0002\u0002\u000267\u0003\u0002\u0002",
    "\u00027<\u0003\u0002\u0002\u00028;\u0005\u001e\u0010\u00029;\u0007\t",
    "\u0002\u0002:8\u0003\u0002\u0002\u0002:9\u0003\u0002\u0002\u0002;>\u0003",
    "\u0002\u0002\u0002<:\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002",
    "=B\u0003\u0002\u0002\u0002><\u0003\u0002\u0002\u0002?A\u0005\u0004\u0003",
    "\u0002@?\u0003\u0002\u0002\u0002AD\u0003\u0002\u0002\u0002B@\u0003\u0002",
    "\u0002\u0002BC\u0003\u0002\u0002\u0002C\u0003\u0003\u0002\u0002\u0002",
    "DB\u0003\u0002\u0002\u0002EG\u0005\u0014\u000b\u0002FE\u0003\u0002\u0002",
    "\u0002GJ\u0003\u0002\u0002\u0002HF\u0003\u0002\u0002\u0002HI\u0003\u0002",
    "\u0002\u0002IK\u0003\u0002\u0002\u0002JH\u0003\u0002\u0002\u0002KO\u0005",
    "\u0006\u0004\u0002LN\u0005\u0014\u000b\u0002ML\u0003\u0002\u0002\u0002",
    "NQ\u0003\u0002\u0002\u0002OM\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002",
    "\u0002P\u0005\u0003\u0002\u0002\u0002QO\u0003\u0002\u0002\u0002RS\u0007",
    "\f\u0002\u0002SW\u0005\u0010\t\u0002TV\u0005\n\u0006\u0002UT\u0003\u0002",
    "\u0002\u0002VY\u0003\u0002\u0002\u0002WU\u0003\u0002\u0002\u0002WX\u0003",
    "\u0002\u0002\u0002XZ\u0003\u0002\u0002\u0002YW\u0003\u0002\u0002\u0002",
    "Z[\u0007\u000e\u0002\u0002[\\\u0005\b\u0005\u0002\\]\u0007\f\u0002\u0002",
    "]^\u0007\u0010\u0002\u0002^_\u0005\u0010\t\u0002_`\u0007\u000e\u0002",
    "\u0002`y\u0003\u0002\u0002\u0002ab\u0007\f\u0002\u0002bf\u0005\u0010",
    "\t\u0002ce\u0005\n\u0006\u0002dc\u0003\u0002\u0002\u0002eh\u0003\u0002",
    "\u0002\u0002fd\u0003\u0002\u0002\u0002fg\u0003\u0002\u0002\u0002gi\u0003",
    "\u0002\u0002\u0002hf\u0003\u0002\u0002\u0002ij\u0007\u000f\u0002\u0002",
    "jy\u0003\u0002\u0002\u0002kl\u0007\f\u0002\u0002lp\u0005\u0010\t\u0002",
    "mo\u0005\n\u0006\u0002nm\u0003\u0002\u0002\u0002or\u0003\u0002\u0002",
    "\u0002pn\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qs\u0003\u0002",
    "\u0002\u0002rp\u0003\u0002\u0002\u0002st\u0007\u000e\u0002\u0002ty\u0003",
    "\u0002\u0002\u0002uy\u0005\u001e\u0010\u0002vy\u0005 \u0011\u0002wy",
    "\u0005\"\u0012\u0002xR\u0003\u0002\u0002\u0002xa\u0003\u0002\u0002\u0002",
    "xk\u0003\u0002\u0002\u0002xu\u0003\u0002\u0002\u0002xv\u0003\u0002\u0002",
    "\u0002xw\u0003\u0002\u0002\u0002y\u0007\u0003\u0002\u0002\u0002z|\u0005",
    "\u0012\n\u0002{z\u0003\u0002\u0002\u0002{|\u0003\u0002\u0002\u0002|",
    "\u0087\u0003\u0002\u0002\u0002}\u0081\u0005\u0006\u0004\u0002~\u0081",
    "\u0005\u0018\r\u0002\u007f\u0081\u0005\u0016\f\u0002\u0080}\u0003\u0002",
    "\u0002\u0002\u0080~\u0003\u0002\u0002\u0002\u0080\u007f\u0003\u0002",
    "\u0002\u0002\u0081\u0083\u0003\u0002\u0002\u0002\u0082\u0084\u0005\u0012",
    "\n\u0002\u0083\u0082\u0003\u0002\u0002\u0002\u0083\u0084\u0003\u0002",
    "\u0002\u0002\u0084\u0086\u0003\u0002\u0002\u0002\u0085\u0080\u0003\u0002",
    "\u0002\u0002\u0086\u0089\u0003\u0002\u0002\u0002\u0087\u0085\u0003\u0002",
    "\u0002\u0002\u0087\u0088\u0003\u0002\u0002\u0002\u0088\t\u0003\u0002",
    "\u0002\u0002\u0089\u0087\u0003\u0002\u0002\u0002\u008a\u008b\u0005\f",
    "\u0007\u0002\u008b\u008c\u0007\u0011\u0002\u0002\u008c\u008d\u0005\u000e",
    "\b\u0002\u008d\u0090\u0003\u0002\u0002\u0002\u008e\u0090\u0005\f\u0007",
    "\u0002\u008f\u008a\u0003\u0002\u0002\u0002\u008f\u008e\u0003\u0002\u0002",
    "\u0002\u0090\u000b\u0003\u0002\u0002\u0002\u0091\u0092\u0007\u0012\u0002",
    "\u0002\u0092\r\u0003\u0002\u0002\u0002\u0093\u0094\u0007\u0018\u0002",
    "\u0002\u0094\u000f\u0003\u0002\u0002\u0002\u0095\u0096\u0007\u0012\u0002",
    "\u0002\u0096\u0011\u0003\u0002\u0002\u0002\u0097\u0098\t\u0002\u0002",
    "\u0002\u0098\u0013\u0003\u0002\u0002\u0002\u0099\u009c\u0005\u0016\f",
    "\u0002\u009a\u009c\u0007\t\u0002\u0002\u009b\u0099\u0003\u0002\u0002",
    "\u0002\u009b\u009a\u0003\u0002\u0002\u0002\u009c\u0015\u0003\u0002\u0002",
    "\u0002\u009d\u009e\t\u0003\u0002\u0002\u009e\u0017\u0003\u0002\u0002",
    "\u0002\u009f\u00a0\u0007\u0006\u0002\u0002\u00a0\u0019\u0003\u0002\u0002",
    "\u0002\u00a1\u00a2\u0007\u0007\u0002\u0002\u00a2\u001b\u0003\u0002\u0002",
    "\u0002\u00a3\u00a4\u0007\u0005\u0002\u0002\u00a4\u001d\u0003\u0002\u0002",
    "\u0002\u00a5\u00a6\u0007\b\u0002\u0002\u00a6\u001f\u0003\u0002\u0002",
    "\u0002\u00a7\u00a8\u0007\n\u0002\u0002\u00a8\u00a9\t\u0004\u0002\u0002",
    "\u00a9!\u0003\u0002\u0002\u0002\u00aa\u00ab\u0007\u000b\u0002\u0002",
    "\u00ab\u00ac\t\u0005\u0002\u0002\u00ac#\u0003\u0002\u0002\u0002\u0017",
    "&(,026:<BHOWfpx{\u0080\u0083\u0087\u008f\u009b"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, null, null, null, null, null, null, 
                     null, "'<'", null, "'>'", "'/>'", "'/'", "'='" ];

var symbolicNames = [ null, "HTML_COMMENT", "HTML_CONDITIONAL_COMMENT", 
                      "XML_DECLARATION", "CDATA", "DTD", "SCRIPTLET", "SEA_WS", 
                      "SCRIPT_OPEN", "STYLE_OPEN", "TAG_OPEN", "HTML_TEXT", 
                      "TAG_CLOSE", "TAG_SLASH_CLOSE", "TAG_SLASH", "TAG_EQUALS", 
                      "TAG_NAME", "TAG_WHITESPACE", "SCRIPT_BODY", "SCRIPT_SHORT_BODY", 
                      "STYLE_BODY", "STYLE_SHORT_BODY", "ATTVALUE_VALUE", 
                      "ATTRIBUTE" ];

var ruleNames =  [ "htmlDocument", "htmlElements", "htmlElement", "htmlContent", 
                   "htmlAttribute", "htmlAttributeName", "htmlAttributeValue", 
                   "htmlTagName", "htmlChardata", "htmlMisc", "htmlComment", 
                   "xhtmlCDATA", "dtd", "xml", "scriptlet", "script", "style" ];

function HTMLParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

HTMLParser.prototype = Object.create(antlr4.Parser.prototype);
HTMLParser.prototype.constructor = HTMLParser;

Object.defineProperty(HTMLParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

HTMLParser.EOF = antlr4.Token.EOF;
HTMLParser.HTML_COMMENT = 1;
HTMLParser.HTML_CONDITIONAL_COMMENT = 2;
HTMLParser.XML_DECLARATION = 3;
HTMLParser.CDATA = 4;
HTMLParser.DTD = 5;
HTMLParser.SCRIPTLET = 6;
HTMLParser.SEA_WS = 7;
HTMLParser.SCRIPT_OPEN = 8;
HTMLParser.STYLE_OPEN = 9;
HTMLParser.TAG_OPEN = 10;
HTMLParser.HTML_TEXT = 11;
HTMLParser.TAG_CLOSE = 12;
HTMLParser.TAG_SLASH_CLOSE = 13;
HTMLParser.TAG_SLASH = 14;
HTMLParser.TAG_EQUALS = 15;
HTMLParser.TAG_NAME = 16;
HTMLParser.TAG_WHITESPACE = 17;
HTMLParser.SCRIPT_BODY = 18;
HTMLParser.SCRIPT_SHORT_BODY = 19;
HTMLParser.STYLE_BODY = 20;
HTMLParser.STYLE_SHORT_BODY = 21;
HTMLParser.ATTVALUE_VALUE = 22;
HTMLParser.ATTRIBUTE = 23;

HTMLParser.RULE_htmlDocument = 0;
HTMLParser.RULE_htmlElements = 1;
HTMLParser.RULE_htmlElement = 2;
HTMLParser.RULE_htmlContent = 3;
HTMLParser.RULE_htmlAttribute = 4;
HTMLParser.RULE_htmlAttributeName = 5;
HTMLParser.RULE_htmlAttributeValue = 6;
HTMLParser.RULE_htmlTagName = 7;
HTMLParser.RULE_htmlChardata = 8;
HTMLParser.RULE_htmlMisc = 9;
HTMLParser.RULE_htmlComment = 10;
HTMLParser.RULE_xhtmlCDATA = 11;
HTMLParser.RULE_dtd = 12;
HTMLParser.RULE_xml = 13;
HTMLParser.RULE_scriptlet = 14;
HTMLParser.RULE_script = 15;
HTMLParser.RULE_style = 16;

function HtmlDocumentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlDocument;
    return this;
}

HtmlDocumentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlDocumentContext.prototype.constructor = HtmlDocumentContext;

HtmlDocumentContext.prototype.scriptlet = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ScriptletContext);
    } else {
        return this.getTypedRuleContext(ScriptletContext,i);
    }
};

HtmlDocumentContext.prototype.SEA_WS = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HTMLParser.SEA_WS);
    } else {
        return this.getToken(HTMLParser.SEA_WS, i);
    }
};


HtmlDocumentContext.prototype.xml = function() {
    return this.getTypedRuleContext(XmlContext,0);
};

HtmlDocumentContext.prototype.dtd = function() {
    return this.getTypedRuleContext(DtdContext,0);
};

HtmlDocumentContext.prototype.htmlElements = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlElementsContext);
    } else {
        return this.getTypedRuleContext(HtmlElementsContext,i);
    }
};

HtmlDocumentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlDocument(this);
	}
};

HtmlDocumentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlDocument(this);
	}
};




HTMLParser.HtmlDocumentContext = HtmlDocumentContext;

HTMLParser.prototype.htmlDocument = function() {

    var localctx = new HtmlDocumentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, HTMLParser.RULE_htmlDocument);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 38;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 36;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.SCRIPTLET:
                    this.state = 34;
                    this.scriptlet();
                    break;
                case HTMLParser.SEA_WS:
                    this.state = 35;
                    this.match(HTMLParser.SEA_WS);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                } 
            }
            this.state = 40;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
        }

        this.state = 42;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HTMLParser.XML_DECLARATION) {
            this.state = 41;
            this.xml();
        }

        this.state = 48;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 46;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.SCRIPTLET:
                    this.state = 44;
                    this.scriptlet();
                    break;
                case HTMLParser.SEA_WS:
                    this.state = 45;
                    this.match(HTMLParser.SEA_WS);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                } 
            }
            this.state = 50;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
        }

        this.state = 52;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HTMLParser.DTD) {
            this.state = 51;
            this.dtd();
        }

        this.state = 58;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,7,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 56;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.SCRIPTLET:
                    this.state = 54;
                    this.scriptlet();
                    break;
                case HTMLParser.SEA_WS:
                    this.state = 55;
                    this.match(HTMLParser.SEA_WS);
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                } 
            }
            this.state = 60;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,7,this._ctx);
        }

        this.state = 64;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HTMLParser.HTML_COMMENT) | (1 << HTMLParser.HTML_CONDITIONAL_COMMENT) | (1 << HTMLParser.SCRIPTLET) | (1 << HTMLParser.SEA_WS) | (1 << HTMLParser.SCRIPT_OPEN) | (1 << HTMLParser.STYLE_OPEN) | (1 << HTMLParser.TAG_OPEN))) !== 0)) {
            this.state = 61;
            this.htmlElements();
            this.state = 66;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlElementsContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlElements;
    return this;
}

HtmlElementsContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlElementsContext.prototype.constructor = HtmlElementsContext;

HtmlElementsContext.prototype.htmlElement = function() {
    return this.getTypedRuleContext(HtmlElementContext,0);
};

HtmlElementsContext.prototype.htmlMisc = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlMiscContext);
    } else {
        return this.getTypedRuleContext(HtmlMiscContext,i);
    }
};

HtmlElementsContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlElements(this);
	}
};

HtmlElementsContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlElements(this);
	}
};




HTMLParser.HtmlElementsContext = HtmlElementsContext;

HTMLParser.prototype.htmlElements = function() {

    var localctx = new HtmlElementsContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, HTMLParser.RULE_htmlElements);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 70;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << HTMLParser.HTML_COMMENT) | (1 << HTMLParser.HTML_CONDITIONAL_COMMENT) | (1 << HTMLParser.SEA_WS))) !== 0)) {
            this.state = 67;
            this.htmlMisc();
            this.state = 72;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 73;
        this.htmlElement();
        this.state = 77;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,10,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 74;
                this.htmlMisc(); 
            }
            this.state = 79;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,10,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlElementContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlElement;
    return this;
}

HtmlElementContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlElementContext.prototype.constructor = HtmlElementContext;

HtmlElementContext.prototype.TAG_OPEN = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HTMLParser.TAG_OPEN);
    } else {
        return this.getToken(HTMLParser.TAG_OPEN, i);
    }
};


HtmlElementContext.prototype.htmlTagName = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlTagNameContext);
    } else {
        return this.getTypedRuleContext(HtmlTagNameContext,i);
    }
};

HtmlElementContext.prototype.TAG_CLOSE = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(HTMLParser.TAG_CLOSE);
    } else {
        return this.getToken(HTMLParser.TAG_CLOSE, i);
    }
};


HtmlElementContext.prototype.htmlContent = function() {
    return this.getTypedRuleContext(HtmlContentContext,0);
};

HtmlElementContext.prototype.TAG_SLASH = function() {
    return this.getToken(HTMLParser.TAG_SLASH, 0);
};

HtmlElementContext.prototype.htmlAttribute = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlAttributeContext);
    } else {
        return this.getTypedRuleContext(HtmlAttributeContext,i);
    }
};

HtmlElementContext.prototype.TAG_SLASH_CLOSE = function() {
    return this.getToken(HTMLParser.TAG_SLASH_CLOSE, 0);
};

HtmlElementContext.prototype.scriptlet = function() {
    return this.getTypedRuleContext(ScriptletContext,0);
};

HtmlElementContext.prototype.script = function() {
    return this.getTypedRuleContext(ScriptContext,0);
};

HtmlElementContext.prototype.style = function() {
    return this.getTypedRuleContext(StyleContext,0);
};

HtmlElementContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlElement(this);
	}
};

HtmlElementContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlElement(this);
	}
};




HTMLParser.HtmlElementContext = HtmlElementContext;

HTMLParser.prototype.htmlElement = function() {

    var localctx = new HtmlElementContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, HTMLParser.RULE_htmlElement);
    var _la = 0; // Token type
    try {
        this.state = 118;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 80;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 81;
            this.htmlTagName();
            this.state = 85;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HTMLParser.TAG_NAME) {
                this.state = 82;
                this.htmlAttribute();
                this.state = 87;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 88;
            this.match(HTMLParser.TAG_CLOSE);
            this.state = 89;
            this.htmlContent();
            this.state = 90;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 91;
            this.match(HTMLParser.TAG_SLASH);
            this.state = 92;
            this.htmlTagName();
            this.state = 93;
            this.match(HTMLParser.TAG_CLOSE);
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 95;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 96;
            this.htmlTagName();
            this.state = 100;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HTMLParser.TAG_NAME) {
                this.state = 97;
                this.htmlAttribute();
                this.state = 102;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 103;
            this.match(HTMLParser.TAG_SLASH_CLOSE);
            break;

        case 3:
            this.enterOuterAlt(localctx, 3);
            this.state = 105;
            this.match(HTMLParser.TAG_OPEN);
            this.state = 106;
            this.htmlTagName();
            this.state = 110;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===HTMLParser.TAG_NAME) {
                this.state = 107;
                this.htmlAttribute();
                this.state = 112;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 113;
            this.match(HTMLParser.TAG_CLOSE);
            break;

        case 4:
            this.enterOuterAlt(localctx, 4);
            this.state = 115;
            this.scriptlet();
            break;

        case 5:
            this.enterOuterAlt(localctx, 5);
            this.state = 116;
            this.script();
            break;

        case 6:
            this.enterOuterAlt(localctx, 6);
            this.state = 117;
            this.style();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlContentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlContent;
    return this;
}

HtmlContentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlContentContext.prototype.constructor = HtmlContentContext;

HtmlContentContext.prototype.htmlChardata = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlChardataContext);
    } else {
        return this.getTypedRuleContext(HtmlChardataContext,i);
    }
};

HtmlContentContext.prototype.htmlElement = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlElementContext);
    } else {
        return this.getTypedRuleContext(HtmlElementContext,i);
    }
};

HtmlContentContext.prototype.xhtmlCDATA = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(XhtmlCDATAContext);
    } else {
        return this.getTypedRuleContext(XhtmlCDATAContext,i);
    }
};

HtmlContentContext.prototype.htmlComment = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(HtmlCommentContext);
    } else {
        return this.getTypedRuleContext(HtmlCommentContext,i);
    }
};

HtmlContentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlContent(this);
	}
};

HtmlContentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlContent(this);
	}
};




HTMLParser.HtmlContentContext = HtmlContentContext;

HTMLParser.prototype.htmlContent = function() {

    var localctx = new HtmlContentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, HTMLParser.RULE_htmlContent);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 121;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if(_la===HTMLParser.SEA_WS || _la===HTMLParser.HTML_TEXT) {
            this.state = 120;
            this.htmlChardata();
        }

        this.state = 133;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,18,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                this.state = 126;
                this._errHandler.sync(this);
                switch(this._input.LA(1)) {
                case HTMLParser.SCRIPTLET:
                case HTMLParser.SCRIPT_OPEN:
                case HTMLParser.STYLE_OPEN:
                case HTMLParser.TAG_OPEN:
                    this.state = 123;
                    this.htmlElement();
                    break;
                case HTMLParser.CDATA:
                    this.state = 124;
                    this.xhtmlCDATA();
                    break;
                case HTMLParser.HTML_COMMENT:
                case HTMLParser.HTML_CONDITIONAL_COMMENT:
                    this.state = 125;
                    this.htmlComment();
                    break;
                default:
                    throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 129;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if(_la===HTMLParser.SEA_WS || _la===HTMLParser.HTML_TEXT) {
                    this.state = 128;
                    this.htmlChardata();
                }
         
            }
            this.state = 135;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,18,this._ctx);
        }

    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttribute;
    return this;
}

HtmlAttributeContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeContext.prototype.constructor = HtmlAttributeContext;

HtmlAttributeContext.prototype.htmlAttributeName = function() {
    return this.getTypedRuleContext(HtmlAttributeNameContext,0);
};

HtmlAttributeContext.prototype.TAG_EQUALS = function() {
    return this.getToken(HTMLParser.TAG_EQUALS, 0);
};

HtmlAttributeContext.prototype.htmlAttributeValue = function() {
    return this.getTypedRuleContext(HtmlAttributeValueContext,0);
};

HtmlAttributeContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttribute(this);
	}
};

HtmlAttributeContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttribute(this);
	}
};




HTMLParser.HtmlAttributeContext = HtmlAttributeContext;

HTMLParser.prototype.htmlAttribute = function() {

    var localctx = new HtmlAttributeContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, HTMLParser.RULE_htmlAttribute);
    try {
        this.state = 141;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
        switch(la_) {
        case 1:
            this.enterOuterAlt(localctx, 1);
            this.state = 136;
            this.htmlAttributeName();
            this.state = 137;
            this.match(HTMLParser.TAG_EQUALS);
            this.state = 138;
            this.htmlAttributeValue();
            break;

        case 2:
            this.enterOuterAlt(localctx, 2);
            this.state = 140;
            this.htmlAttributeName();
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttributeName;
    return this;
}

HtmlAttributeNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeNameContext.prototype.constructor = HtmlAttributeNameContext;

HtmlAttributeNameContext.prototype.TAG_NAME = function() {
    return this.getToken(HTMLParser.TAG_NAME, 0);
};

HtmlAttributeNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttributeName(this);
	}
};

HtmlAttributeNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttributeName(this);
	}
};




HTMLParser.HtmlAttributeNameContext = HtmlAttributeNameContext;

HTMLParser.prototype.htmlAttributeName = function() {

    var localctx = new HtmlAttributeNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, HTMLParser.RULE_htmlAttributeName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 143;
        this.match(HTMLParser.TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlAttributeValueContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlAttributeValue;
    return this;
}

HtmlAttributeValueContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlAttributeValueContext.prototype.constructor = HtmlAttributeValueContext;

HtmlAttributeValueContext.prototype.ATTVALUE_VALUE = function() {
    return this.getToken(HTMLParser.ATTVALUE_VALUE, 0);
};

HtmlAttributeValueContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlAttributeValue(this);
	}
};

HtmlAttributeValueContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlAttributeValue(this);
	}
};




HTMLParser.HtmlAttributeValueContext = HtmlAttributeValueContext;

HTMLParser.prototype.htmlAttributeValue = function() {

    var localctx = new HtmlAttributeValueContext(this, this._ctx, this.state);
    this.enterRule(localctx, 12, HTMLParser.RULE_htmlAttributeValue);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 145;
        this.match(HTMLParser.ATTVALUE_VALUE);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlTagNameContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlTagName;
    return this;
}

HtmlTagNameContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlTagNameContext.prototype.constructor = HtmlTagNameContext;

HtmlTagNameContext.prototype.TAG_NAME = function() {
    return this.getToken(HTMLParser.TAG_NAME, 0);
};

HtmlTagNameContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlTagName(this);
	}
};

HtmlTagNameContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlTagName(this);
	}
};




HTMLParser.HtmlTagNameContext = HtmlTagNameContext;

HTMLParser.prototype.htmlTagName = function() {

    var localctx = new HtmlTagNameContext(this, this._ctx, this.state);
    this.enterRule(localctx, 14, HTMLParser.RULE_htmlTagName);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 147;
        this.match(HTMLParser.TAG_NAME);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlChardataContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlChardata;
    return this;
}

HtmlChardataContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlChardataContext.prototype.constructor = HtmlChardataContext;

HtmlChardataContext.prototype.HTML_TEXT = function() {
    return this.getToken(HTMLParser.HTML_TEXT, 0);
};

HtmlChardataContext.prototype.SEA_WS = function() {
    return this.getToken(HTMLParser.SEA_WS, 0);
};

HtmlChardataContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlChardata(this);
	}
};

HtmlChardataContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlChardata(this);
	}
};




HTMLParser.HtmlChardataContext = HtmlChardataContext;

HTMLParser.prototype.htmlChardata = function() {

    var localctx = new HtmlChardataContext(this, this._ctx, this.state);
    this.enterRule(localctx, 16, HTMLParser.RULE_htmlChardata);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 149;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.SEA_WS || _la===HTMLParser.HTML_TEXT)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlMiscContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlMisc;
    return this;
}

HtmlMiscContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlMiscContext.prototype.constructor = HtmlMiscContext;

HtmlMiscContext.prototype.htmlComment = function() {
    return this.getTypedRuleContext(HtmlCommentContext,0);
};

HtmlMiscContext.prototype.SEA_WS = function() {
    return this.getToken(HTMLParser.SEA_WS, 0);
};

HtmlMiscContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlMisc(this);
	}
};

HtmlMiscContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlMisc(this);
	}
};




HTMLParser.HtmlMiscContext = HtmlMiscContext;

HTMLParser.prototype.htmlMisc = function() {

    var localctx = new HtmlMiscContext(this, this._ctx, this.state);
    this.enterRule(localctx, 18, HTMLParser.RULE_htmlMisc);
    try {
        this.state = 153;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case HTMLParser.HTML_COMMENT:
        case HTMLParser.HTML_CONDITIONAL_COMMENT:
            this.enterOuterAlt(localctx, 1);
            this.state = 151;
            this.htmlComment();
            break;
        case HTMLParser.SEA_WS:
            this.enterOuterAlt(localctx, 2);
            this.state = 152;
            this.match(HTMLParser.SEA_WS);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function HtmlCommentContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_htmlComment;
    return this;
}

HtmlCommentContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
HtmlCommentContext.prototype.constructor = HtmlCommentContext;

HtmlCommentContext.prototype.HTML_COMMENT = function() {
    return this.getToken(HTMLParser.HTML_COMMENT, 0);
};

HtmlCommentContext.prototype.HTML_CONDITIONAL_COMMENT = function() {
    return this.getToken(HTMLParser.HTML_CONDITIONAL_COMMENT, 0);
};

HtmlCommentContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterHtmlComment(this);
	}
};

HtmlCommentContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitHtmlComment(this);
	}
};




HTMLParser.HtmlCommentContext = HtmlCommentContext;

HTMLParser.prototype.htmlComment = function() {

    var localctx = new HtmlCommentContext(this, this._ctx, this.state);
    this.enterRule(localctx, 20, HTMLParser.RULE_htmlComment);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 155;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.HTML_COMMENT || _la===HTMLParser.HTML_CONDITIONAL_COMMENT)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function XhtmlCDATAContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_xhtmlCDATA;
    return this;
}

XhtmlCDATAContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
XhtmlCDATAContext.prototype.constructor = XhtmlCDATAContext;

XhtmlCDATAContext.prototype.CDATA = function() {
    return this.getToken(HTMLParser.CDATA, 0);
};

XhtmlCDATAContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterXhtmlCDATA(this);
	}
};

XhtmlCDATAContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitXhtmlCDATA(this);
	}
};




HTMLParser.XhtmlCDATAContext = XhtmlCDATAContext;

HTMLParser.prototype.xhtmlCDATA = function() {

    var localctx = new XhtmlCDATAContext(this, this._ctx, this.state);
    this.enterRule(localctx, 22, HTMLParser.RULE_xhtmlCDATA);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 157;
        this.match(HTMLParser.CDATA);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function DtdContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_dtd;
    return this;
}

DtdContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
DtdContext.prototype.constructor = DtdContext;

DtdContext.prototype.DTD = function() {
    return this.getToken(HTMLParser.DTD, 0);
};

DtdContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterDtd(this);
	}
};

DtdContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitDtd(this);
	}
};




HTMLParser.DtdContext = DtdContext;

HTMLParser.prototype.dtd = function() {

    var localctx = new DtdContext(this, this._ctx, this.state);
    this.enterRule(localctx, 24, HTMLParser.RULE_dtd);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 159;
        this.match(HTMLParser.DTD);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function XmlContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_xml;
    return this;
}

XmlContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
XmlContext.prototype.constructor = XmlContext;

XmlContext.prototype.XML_DECLARATION = function() {
    return this.getToken(HTMLParser.XML_DECLARATION, 0);
};

XmlContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterXml(this);
	}
};

XmlContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitXml(this);
	}
};




HTMLParser.XmlContext = XmlContext;

HTMLParser.prototype.xml = function() {

    var localctx = new XmlContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, HTMLParser.RULE_xml);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 161;
        this.match(HTMLParser.XML_DECLARATION);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScriptletContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_scriptlet;
    return this;
}

ScriptletContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScriptletContext.prototype.constructor = ScriptletContext;

ScriptletContext.prototype.SCRIPTLET = function() {
    return this.getToken(HTMLParser.SCRIPTLET, 0);
};

ScriptletContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterScriptlet(this);
	}
};

ScriptletContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitScriptlet(this);
	}
};




HTMLParser.ScriptletContext = ScriptletContext;

HTMLParser.prototype.scriptlet = function() {

    var localctx = new ScriptletContext(this, this._ctx, this.state);
    this.enterRule(localctx, 28, HTMLParser.RULE_scriptlet);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 163;
        this.match(HTMLParser.SCRIPTLET);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ScriptContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_script;
    return this;
}

ScriptContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ScriptContext.prototype.constructor = ScriptContext;

ScriptContext.prototype.SCRIPT_OPEN = function() {
    return this.getToken(HTMLParser.SCRIPT_OPEN, 0);
};

ScriptContext.prototype.SCRIPT_BODY = function() {
    return this.getToken(HTMLParser.SCRIPT_BODY, 0);
};

ScriptContext.prototype.SCRIPT_SHORT_BODY = function() {
    return this.getToken(HTMLParser.SCRIPT_SHORT_BODY, 0);
};

ScriptContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterScript(this);
	}
};

ScriptContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitScript(this);
	}
};




HTMLParser.ScriptContext = ScriptContext;

HTMLParser.prototype.script = function() {

    var localctx = new ScriptContext(this, this._ctx, this.state);
    this.enterRule(localctx, 30, HTMLParser.RULE_script);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 165;
        this.match(HTMLParser.SCRIPT_OPEN);
        this.state = 166;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.SCRIPT_BODY || _la===HTMLParser.SCRIPT_SHORT_BODY)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function StyleContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = HTMLParser.RULE_style;
    return this;
}

StyleContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
StyleContext.prototype.constructor = StyleContext;

StyleContext.prototype.STYLE_OPEN = function() {
    return this.getToken(HTMLParser.STYLE_OPEN, 0);
};

StyleContext.prototype.STYLE_BODY = function() {
    return this.getToken(HTMLParser.STYLE_BODY, 0);
};

StyleContext.prototype.STYLE_SHORT_BODY = function() {
    return this.getToken(HTMLParser.STYLE_SHORT_BODY, 0);
};

StyleContext.prototype.enterRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.enterStyle(this);
	}
};

StyleContext.prototype.exitRule = function(listener) {
    if(listener instanceof HTMLParserListener ) {
        listener.exitStyle(this);
	}
};




HTMLParser.StyleContext = StyleContext;

HTMLParser.prototype.style = function() {

    var localctx = new StyleContext(this, this._ctx, this.state);
    this.enterRule(localctx, 32, HTMLParser.RULE_style);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 168;
        this.match(HTMLParser.STYLE_OPEN);
        this.state = 169;
        _la = this._input.LA(1);
        if(!(_la===HTMLParser.STYLE_BODY || _la===HTMLParser.STYLE_SHORT_BODY)) {
        this._errHandler.recoverInline(this);
        }
        else {
        	this._errHandler.reportMatch(this);
            this.consume();
        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


exports.HTMLParser = HTMLParser;

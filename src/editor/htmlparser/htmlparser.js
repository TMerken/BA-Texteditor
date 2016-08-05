var core = core || {};

core.htmlparser = core.htmlparser || function () {
  var self = this;
  var output;
  var richTextField;

  this.getOutput = function () {
    return output;
  };

  var reset = function () {
    output = "";
  };

  this.initialize = function ( editor ) {
    reset();
    richTextField = editor;
  };

  this.write = function (text) {
    output = text;
  };

  this.writeHTML = function ( html, lineBreak ) {
     if (lineBreak) {
       createLineBreak();
    } else {
      self.write( html );
    }
  };

  this.getHTML = function () {
    return output;
  };

  this.writeHTMLDefault = function () {
    self.writeHTML( self.getHTMLDefault(), false );
    richTextField.contentWindow.document.body.innerHTML = output;
  };

  this.getHTMLDefault = function () {
    return "<div><br></div>";
  };

  this.buildCommand = function (command, showDefaultUI, valueArgument) {
    richTextField.contentWindow.document.execCommand(command, showDefaultUI, valueArgument);
    self.write(richTextField.contentWindow.document.body.innerHTML);
  };

  this.update = function() {
    richTextField.contentWindow.document.body.innerHTML = output;
  };

  var createLineBreak = function () {
    var tag = openTag("br") + openTagClose(false) + "\u200C";
    self.buildCommand("insertHTML", false, tag);
    self.buildCommand("insertBrOnReturn", false, true);
  };

  var openTag = function(tagname) {
    return '<' + tagname;
  };

  var openTagClose = function(isSelfClosing) {
     if (isSelfClosing) {
      return ' />';
    } else {
      return '>';
    }
  };

  var closeTag = function(tagname) {
    return '</' + tagname + '>';
  };
};

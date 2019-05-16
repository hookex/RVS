WebGL2RenderingContext.prototype.drawElements = function() {
    console.log('drawElements')
}

WebGL2RenderingContext.prototype.drawElementsInstanced = function() {
    console.log('drawElementsInstanced')
}

WebGL2RenderingContext.prototype.drawArrayInstanced = function() {
    console.log('drawArrayInstanced')
}

Document.prototype.querySelector = function() {
    console.log('querySelector')
    Document.prototype.querySelector.apply(this, arguments)
}
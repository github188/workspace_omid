Ext.data.JsonP.Ext_util_DelayedTask({"tagname":"class","html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/DelayedTask.html#Ext-util-DelayedTask' target='_blank'>DelayedTask.js</a></div></pre><div class='doc-contents'><p>The DelayedTask class provides a convenient way to \"buffer\" the execution of a method,\nperforming setTimeout where a new timeout cancels the old timeout. When called, the\ntask will wait the specified time period before executing. If durng that time period,\nthe task is called again, the original call will be cancelled. This continues so that\nthe function is only called a single time for each iteration.</p>\n\n<p>This method is especially useful for things like detecting whether a user has finished\ntyping in a text field. An example would be performing validation on a keypress. You can\nuse this class to buffer the keypress events for a certain number of milliseconds, and\nperform only if they stop for that amount of time.</p>\n\n<h2>Usage</h2>\n\n<pre><code>var task = new Ext.util.DelayedTask(function(){\n    alert(Ext.getDom('myInputField').value.length);\n});\n\n// Wait 500ms before calling our function. If the user presses another key\n// during that 500ms, it will be cancelled and we'll wait another 500ms.\nExt.get('myInputField').on('keypress', function(){\n    task.<a href=\"#!/api/Ext.util.DelayedTask-method-delay\" rel=\"Ext.util.DelayedTask-method-delay\" class=\"docClass\">delay</a>(500);\n});\n</code></pre>\n\n<p>Note that we are using a DelayedTask here to illustrate a point. The configuration\noption <code>buffer</code> for <a href=\"#!/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">addListener/on</a> will\nalso setup a delayed task for you to buffer events.</p>\n</div><div class='members'><div id='m-method'><div class='definedBy'>Defined By</div><h3 class='members-title'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.DelayedTask' rel='Ext.util.DelayedTask' class='definedIn docClass'>Ext.util.DelayedTask</a><br/><a href='source/DelayedTask.html#Ext-util-DelayedTask-method-constructor' target='_blank' class='viewSource'>view source</a></div><strong class='constructor-signature'>new</strong><a href='#!/api/Ext.util.DelayedTask-method-constructor' class='name expandable'>Ext.util.DelayedTask</a>( <span class='pre'>[<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> fn], [<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> scope], [<a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a> args]</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>The parameters to this constructor serve as defaults and are not required. ...</div><div class='long'><p>The parameters to this constructor serve as defaults and are not required.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>The default function to call. If not specified here, it must be specified during the <a href=\"#!/api/Ext.util.DelayedTask-method-delay\" rel=\"Ext.util.DelayedTask-method-delay\" class=\"docClass\">delay</a> call.</p>\n</div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>The default scope (The <code><b>this</b></code> reference) in which the\nfunction is called. If not specified, <code>this</code> will refer to the browser window.</p>\n</div></li><li><span class='pre'>args</span> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a> (optional)<div class='sub-desc'><p>The default Array of arguments.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-cancel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.DelayedTask' rel='Ext.util.DelayedTask' class='definedIn docClass'>Ext.util.DelayedTask</a><br/><a href='source/DelayedTask.html#Ext-util-DelayedTask-method-cancel' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.util.DelayedTask-method-cancel' class='name expandable'>cancel</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Cancel the last queued timeout ...</div><div class='long'><p>Cancel the last queued timeout</p>\n</div></div></div><div id='method-delay' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Ext.util.DelayedTask' rel='Ext.util.DelayedTask' class='definedIn docClass'>Ext.util.DelayedTask</a><br/><a href='source/DelayedTask.html#Ext-util-DelayedTask-method-delay' target='_blank' class='viewSource'>view source</a></div><a href='#!/api/Ext.util.DelayedTask-method-delay' class='name expandable'>delay</a>( <span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a> delay, [<a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> newFn], [<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> newScope], [<a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a> newArgs]</span> )</div><div class='description'><div class='short'>Cancels any pending timeout and queues a new one ...</div><div class='long'><p>Cancels any pending timeout and queues a new one</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>delay</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>The milliseconds to delay</p>\n</div></li><li><span class='pre'>newFn</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a> (optional)<div class='sub-desc'><p>Overrides function passed to constructor</p>\n</div></li><li><span class='pre'>newScope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>Overrides scope passed to constructor. Remember that if no scope\nis specified, <code>this</code> will refer to the browser window.</p>\n</div></li><li><span class='pre'>newArgs</span> : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a> (optional)<div class='sub-desc'><p>Overrides args passed to constructor</p>\n</div></li></ul></div></div></div></div></div></div></div>","allMixins":[],"meta":{},"requires":[],"deprecated":null,"extends":null,"inheritable":false,"static":false,"superclasses":[],"singleton":false,"code_type":"assignment","alias":null,"statics":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[],"event":[]},"subclasses":[],"uses":[],"protected":false,"mixins":[],"members":{"property":[],"css_var":[],"css_mixin":[],"cfg":[],"method":[{"tagname":"method","deprecated":null,"static":false,"owner":"Ext.util.DelayedTask","template":false,"required":null,"protected":false,"name":"constructor","id":"method-constructor"},{"tagname":"method","deprecated":null,"static":false,"owner":"Ext.util.DelayedTask","template":false,"required":null,"protected":false,"name":"cancel","id":"method-cancel"},{"tagname":"method","deprecated":null,"static":false,"owner":"Ext.util.DelayedTask","template":false,"required":null,"protected":false,"name":"delay","id":"method-delay"}],"event":[]},"private":false,"component":false,"name":"Ext.util.DelayedTask","alternateClassNames":[],"id":"class-Ext.util.DelayedTask","mixedInto":[],"xtypes":{},"files":[{"href":"DelayedTask.html#Ext-util-DelayedTask","filename":"DelayedTask.js"}]});
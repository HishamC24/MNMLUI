# Section

When having multiple related pages within one site or app, sections should be used to separate distinct yet related parts of content.

Ideally, your site will have javascript to deal with showing or hiding these sections, keeping one showing at the beginning and the rest having `.removed`, and changing which section doesn't have the `.removed` class

```vue-html
<body>
    <section></section>
    <section.removed></section>
</body>
```

Usually your site will have a navbar that can switch between these. Here is an example with (just the small version of) the [tab bar](tab-bar.md) navigation:

<pre class="language-vue-html"><code class="lang-vue-html">&#x3C;body>
    &#x3C;nav>
        &#x3C;div#small>
            &#x3C;div.tab-bar.glassy>
                &#x3C;div.tab-item>...&#x3C;/div>
<strong>                &#x3C;div.tab-item#selected>...&#x3C;/div>
</strong>                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
            &#x3C;/div>
        &#x3C;/div>
    &#x3C;/nav>
    
    &#x3C;section.removed>&#x3C;/section>
<strong>    &#x3C;section>&#x3C;/section>
</strong>    &#x3C;section.removed>&#x3C;/section>
    &#x3C;section.removed>&#x3C;/section>
&#x3C;/body>
</code></pre>

# Tab Bar

A main way to pageify content is to use a tab bar. Where a user will focus on one page at a time, a tab bar allows them to know which section they are in, and what content might be inside.

## Small (Mobile)

When making a tab bar, you can have from two to four items, and five if you do not have an action button. One is not recommended, since it would be pointless. Keep the action button to significant roles, something that might be used commonly.

<figure><picture><source srcset="../.gitbook/assets/TabBar Buttonless Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Buttonless Light.png" alt=""></picture><figcaption></figcaption></figure>

```vue-html
<body>
    <nav>
        <div#small>
            <div.tab-bar.glassy>
                <div.tab-item#selected>
                    <svg>...</svg>
                    <p>Home</p>
                </div>
                <div.tab-item>
                    <svg>...</svg>
                    <p>New</p>
                </div>
                <div.tab-item>
                    <svg>...</svg>
                    <p>Library</p>
                </div>
                <div.tab-item>
                    <svg>...</svg>
                    <p>Radio</p>
                </div>
                <div.tab-item>
                    <svg>...</svg>
                    <p>Search</p>
                </div>
            </div>
        </div>
    <nav>
</body>
```

### Action Button

If you have a significant action that is used commonly, it is recommended to have an action button alongside the navbar. This stays on the right for accessibility for most users; future implementations might allow a left-side version based on accessibility settings.

<figure><picture><source srcset="../.gitbook/assets/TabBar Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Light.png" alt=""></picture><figcaption></figcaption></figure>

<pre class="language-vue-html"><code class="lang-vue-html">&#x3C;body>
    &#x3C;nav>
        &#x3C;div#small>
            &#x3C;div.tab-bar.glassy>
                &#x3C;div.tab-item#selected>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
            &#x3C;/div>
            
<strong>            &#x3C;div.action-btn.glassy>
</strong><strong>                &#x3C;svg>...&#x3C;/svg>
</strong><strong>            &#x3C;/div>
</strong>        &#x3C;/div>
    &#x3C;nav>
&#x3C;/body>
</code></pre>

### Accessory Bar

There is also an accessory bar for extra content; in this example, replicating iOS26's Apple Music app, it is used for song playback controls and details. It is recommended to design for the [compact view](tab-bar.md#compact-view) first, and then adapt to the expanded view.

<figure><picture><source srcset="../.gitbook/assets/TabBar Accessory Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Accessory Light.png" alt=""></picture><figcaption></figcaption></figure>

<pre class="language-vue-html"><code class="lang-vue-html">&#x3C;body>
    &#x3C;nav>
        &#x3C;div#small>
            &#x3C;div.tab-bar.glassy>...&#x3C;/div>
            
<strong>            &#x3C;div.accessory-bar.glassy>...&#x3C;/div>
</strong>            
            &#x3C;div.action-btn.glassy>...&#x3C;/div>
        &#x3C;/div>
    &#x3C;nav>
&#x3C;/body>
</code></pre>

### Compact View

The accessory bar can automatically adapt to fill in the space between the current tab button and the action button in the compact view. This happens on scroll down. When at the bottom of a page, it expands to the expanded view. If you do not have an accessory bar, the space is kept empty.

<figure><picture><source srcset="../.gitbook/assets/TabBar Compact Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Compact Light.png" alt=""></picture><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/TabBar iOS26.png" alt=""><figcaption><p>Source: Apple</p></figcaption></figure>

## Medium (Tablet)

For medium-sized (and large) tab bars, you are free to have more items shown. Try to keep it minimal, both for folding devices that just barely meet the width threshold to be considered a tablet, and might also have floating button(s) on the top left and right. Code for both this and the larger size should be put alongside the small version of the nav.

That being said, the items here should match the small size, alongside additional ones that might make more sense for more "power" users using a larger screen.

Animation here is recommended to be medium, since it's larger in size than the small nav.

<figure><picture><source srcset="../.gitbook/assets/TabBar Dark (1).png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Light (1).png" alt=""></picture><figcaption></figcaption></figure>

```vue-html
<body>
    <nav>
        <div#small>...</div>
        <div#medium>
            <div.tab-bar.glassy.sc-m>
                <div.tab-item#selected>
                    <p>Home</p>
                </div>
                <div.tab-item>
                    <p>New</p>
                </div>
                <div.tab-item>
                    <p>Radio</p>
                </div>
                <div.tab-item>
                    <p>Library</p>
                </div>
            </div>
        </div>
    <nav>
</body>
```

### Action Button

The action button here is recommended to be the same as the one in the small nav version, to keep the consistency between all navbars.

<figure><picture><source srcset="../.gitbook/assets/TabBar Toggleless Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Toggleless Light.png" alt=""></picture><figcaption></figcaption></figure>

<pre class="language-vue-html"><code class="lang-vue-html">&#x3C;body>
    &#x3C;nav>
        &#x3C;div#medium>
            &#x3C;div.tab-bar.glassy.sc-m>
                &#x3C;div.tab-item#selected>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                
<strong>                &#x3C;svg.action-btn>...&#x3C;/svg>
</strong>            &#x3C;/div>
        &#x3C;/div>
    &#x3C;nav>
&#x3C;/body>
</code></pre>

### Large Nav Toggle

Animation here is recommended to be medium, since it's larger in size than the small nav. If you want to let the user be able to convert the medium-sized nav to a larger one, you can add a nav toggle button. Tapping or clicking this will convert the navbar into the side, larger tab bar.

<figure><picture><source srcset="../.gitbook/assets/TabBar Actionless Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Actionless Light.png" alt=""></picture><figcaption></figcaption></figure>

<pre class="language-vue-html"><code class="lang-vue-html">&#x3C;body>
    &#x3C;nav>
        &#x3C;div#medium>
            &#x3C;div.tab-bar.glassy.sc-m>
<strong>                &#x3C;svg#nav-toggle>...&#x3C;/svg>
</strong>                
                &#x3C;div.tab-item#selected>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
                &#x3C;div.tab-item>...&#x3C;/div>
            &#x3C;/div>
        &#x3C;/div>
    &#x3C;nav>
&#x3C;/body>
</code></pre>

### Full Bar

This is what the medium tab bar looks like with the sidebar toggle and the action button.

<figure><picture><source srcset="../.gitbook/assets/TabBar Full Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Full Light.png" alt=""></picture><figcaption></figcaption></figure>

```vue-html
<body>
    <nav>
        <div#medium>
            <div.tab-bar.glassy.sc-m>
                <svg#nav-toggle>...</svg>
                <div.tab-item#selected>...</div>
                <div.tab-item>...</div>
                <div.tab-item>...</div>
                <div.tab-item>...</div>
                <svg.action-btn>...</svg>
            </div>
        </div>
    <nav>
</body>
```

<figure><img src="../.gitbook/assets/TabBar iPadOS26.png" alt=""><figcaption><p>Source: Apple</p></figcaption></figure>

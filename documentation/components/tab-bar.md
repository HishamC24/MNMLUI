# Tab Bar

<figure><picture><source srcset="../.gitbook/assets/TabBar Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Light.png" alt=""></picture><figcaption></figcaption></figure>

A main way to pageify content is to use a tab bar. Where a user will focus on one page at a time, a tab bar allows them to know which section they are in, and what content might be inside.

The image above is as follows:

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
                    <p>Radio</p>
                </div>
                <div.tab-item>
                    <svg>...</svg>
                    <p>Library</p>
                </div>
            </div>
            
            <div.action-btn.glassy>
                <svg>...</svg>
            </div>
        </div>
    <nav>
</body>
```

## Small Nav (Mobile)

When making a tab bar, you can have from two to four items, and five if you do not have an action button. One is not recommended, since it would be pointless. Keep the action button to significant roles, something that might be used commonly.

<figure><picture><source srcset="../.gitbook/assets/TabBar Buttonless Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Buttonless Light.png" alt=""></picture><figcaption></figcaption></figure>

```vue-html
<body>
    <nav>
        <div#small>
            <div.tab-bar.glassy>
                <div.tab-item#selected>...</div>
                <div.tab-item>...</div>
                <div.tab-item>...</div>
                <div.tab-item>...</div>
                <div.tab-item>...</div>
            </div>
        </div>
    <nav>
</body>
```

### Accessory Bar

There is also an accessory bar for extra content; in this example, replicating iOS26's Apple Music app, it is used for song playback controls and details. It is recommended to design for the [compact view](tab-bar.md#compact-view) first, and then adapt to the expanded view.

<figure><picture><source srcset="../.gitbook/assets/TabBar Accessory Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Accessory Light.png" alt=""></picture><figcaption></figcaption></figure>

```vue-html
<body>
    <nav>
        <div#small>
            <div.tab-bar.glassy>...</div>
            
            <div.accessory-bar.glassy>...</div>
            
            <div.action-btn.glassy>...</div>
        </div>
    <nav>
</body>
```

### Compact View

The accessory bar can automatically adapt to fill in the space between the current tab button and the action button in the compact view. This happens on scroll down. When at the bottom of a page, it expands to the expanded view. If you do not have an accessory bar, the space is kept empty.

<figure><picture><source srcset="../.gitbook/assets/TabBar Compact Dark.png" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/TabBar Compact Light.png" alt=""></picture><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/TabBar iOS26.png" alt=""><figcaption><p>Source: Apple</p></figcaption></figure>


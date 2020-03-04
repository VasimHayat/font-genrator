# font-genrator

Genrate the font from Svg files and use like font-awesome

# build font

npm run build

# run

npm run start

# metadata.json

      {
        "fontName": "myfont",
        "iconPath": "svg",
        "fontDestination": "fonts",
        "fontClasses": [
            {
            "name": "fg-home",
            "unicode": "\uE001"
            },
            {
            "name": "fg-dashboard",
            "unicode": "\uE002"
            },
            {
            "name": "fg-task",
            "unicode": "\uE003"
            }
        ]
        }

    #fontName - Folder Name for resource svg, and this name is also used as your *font Name*

    #iconPath - Folder Path for svg resources
        example if icon path name is *svg* and your font name is *myFont* then
        your svg resource file strature look like this *svg/myfont*

    #fontDestination - font destination path

    #fontClasses -

        #name - name of svg file example: fg-home.svg  and font will be genrated
        with same name like .fg-home:before{content:'/xyz'}

        #unicode - unique unicode value for your svg/font

# How to use

        <style>
        @font-face {
            font-family: 'myfont';
            src: url('./fonts/myfont/myfont.eot');
            src: url('./fonts/myfont/mylib.eot?#iefix')
            format('embedded-opentype'),

            url('./fonts/myfont/myfont.woff2')
            format('woff2'),

            url('./fonts/myfont/myfont.woff')
            format('woff'),

            url('./fonts/myfont/myfont.ttf')
            format('truetype'),

            url('./fonts/myfont/myfont.svg?#myfont')
            format('svg');

            font-weight: normal;
            font-style: normal;
        }

        [class*="fg-"]:before {
            font-family: "myfont";
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            display: inline-block;
            text-decoration: inherit;
            width: 1em;
            margin-right: .2em;
            text-align: center;
            font-variant: normal;
            text-transform: none;
            line-height: 1em;
            margin-left: .2em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .fg-home:before {
            content: '\e001';
        }

        .fg-dashboard:before {
            content: '\e002';
        }

        .fg-task:before {
            content: '\e003';
        }
        </style>


        <span class="fg-home"></span>
        <span class="fg-dashboard"></span>
        <span class="fg-task"></span>

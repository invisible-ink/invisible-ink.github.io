export function initJS() {
    console.log('initJS')
    var clickTag = 'https://projects.invisible.ink/clickTag/standard.html'

    var headerHeight = $('#sideNav header').height()
    var buildHeight = $('.build').height()
    var buildCount = $('.build').length
    var maxMenuHeight =
        $(window).height() -
        (headerHeight + buildHeight * buildCount + buildCount)
    var singleTLGMode = $('.build-title').length === 1

    var CONFIG = window.CONFIG || {}
    CONFIG = Object.assign(
        {
            autoplayFirst: true,
        },
        CONFIG
    )

    init()

    function onLoad() {
        console.log('window load')
        // Header Text sizing
        var sideNavWidth = $('#sideNav')
            .css('width')
            .substr(0, $('#sideNav').css('width').length - 2)
        var headerPadding = $('#sideNav header')
            .css('padding-left')
            .substr(0, $('#sideNav header').css('padding-left').length - 2)
        var maxTitleWidth = sideNavWidth - headerPadding * 2

        // Client title needs to shrink
        var titleWidth = $('h1').width()
        var titleStartingSize = $('h1')
            .css('fontSize')
            .substr(0, $('h1').css('fontSize').length - 2)
        if (titleWidth > maxTitleWidth) {
            while (titleWidth > maxTitleWidth) {
                titleStartingSize--
                $('h1').css({
                    fontSize: titleStartingSize + 'px',
                    lineHeight: subTitleStartingSize / 2 + 'px',
                })
                titleWidth = $('h1').width()
            }
        }

        // Job title needs to shrink
        var subTitleWidth = $('h2').width()
        var subTitleStartingSize = $('h2')
            .css('fontSize')
            .substr(0, $('h2').css('fontSize').length - 2)
        if (subTitleWidth > maxTitleWidth) {
            while (subTitleWidth > maxTitleWidth) {
                subTitleStartingSize--
                $('h2').css({
                    fontSize: subTitleStartingSize + 'px',
                    lineHeight: subTitleStartingSize + 'px',
                })
                subTitleWidth = $('h2').width()
            }
        }

        // Center titles in sideNav header
        var headerHeight = $('#sideNav header').height()
        var headerCentering =
            (headerHeight - $('.header-container').height()) / 2
        $('.header-container').css({
            'padding-top': headerCentering,
        })

        // Make it visible now that everything's all good.
        $('.header-container').css({
            visibility: 'visible',
            opacity: '1',
        })
    }

    console.log('document.readyState: ' + document.readyState)
    if (document.readyState === 'complete') {
        onLoad()
    } else {
        $(window).load(onLoad)
    }

    // add asset counts to each group
    if (document.querySelector('#internal')) {
        Array.from(
            document.querySelectorAll('.build-menu, .menu-group')
        ).forEach((el) => {
            var prevEl = el.previousElementSibling
            if (prevEl.firstElementChild) {
                prevEl = prevEl.firstElementChild
            }
            var groupName = prevEl.innerText
            var assetCount = el.querySelectorAll('.banner-link').length
            prevEl.innerHTML +=
                " <span style='opacity:.4;'>(" + assetCount + ')</span>'
        })
    }

    // Click a banner build
    $('a .build-title').click(function (ev) {
        ev.preventDefault()

        // is it open?
        if ($(this).hasClass('buildClicked')) {
            closeAll()
        } else {
            openMenu(this, ev.shiftKey)
        }
    })

    // Subgroup clicked
    $('.build-menu p').click(function (e) {
        if (e.shiftKey) {
            var allSizes = $(this).next().find('a')

            // Activate all links
            $('.build-menu a.banner-link').removeClass('sizeClicked')
            allSizes.toggleClass('sizeClicked')

            showAllAssets(allSizes, $(this).text())
        }
    })

    // Size clicked
    if (PROJECT_CONFIG['showInViewer'] !== 'NO') {
        $('.build-menu a.banner-link').click(function (e) {
            if ($(this).data('showinviewer') === 'NO') {
                return
            }

            e.preventDefault()

            if (e.shiftKey) {
                $(this).addClass('sizeClicked')

                showAsset($(this), true)
            } else {
                // Change text color to "clicked" state
                $('.build-menu a.banner-link').removeClass('sizeClicked')
                $(this).toggleClass('sizeClicked')

                showAsset($(this))
            }
        })
    }

    function init() {
        if (CONFIG.autoplayFirst) {
            openMenu($('.build-title:first').get(0), false)
        }
    }

    function showAllAssets(aTags, subGroupTitle) {
        hideInfo()

        var bannerHTML = ''
        var oldBuild = ''

        for (var i = 0; i < aTags.length; i++) {
            // Banner data
            var bWidth = parseInt($(aTags[i]).data('width'))
            var bHeight = parseInt($(aTags[i]).data('height'))
            var bType = $(aTags[i]).data('type')
            var bLink = $(aTags[i]).attr('href')
            //var bTitle = $(aTags[i]).data("title");

            var currentBuild = $(aTags[i]).parent().parent().prev().text()

            // New build?
            if (oldBuild != currentBuild) {
                if (oldBuild != '') bannerHTML += '</div>'
                bannerHTML +=
                    "<div class='buildBlock'>" + currentBuild + '<br/>'
            }

            bannerHTML += "<div class='multi-banner'>"

            bannerHTML += getAssetHTML(bType, bWidth, bHeight, bLink)

            bannerHTML +=
                '<br/>' +
                currentBuild +
                ' - ' +
                bWidth +
                'x' +
                bHeight +
                '\
			</div>'
            //"<br/>" + bWidth + "x" + bHeight + "\

            oldBuild = currentBuild
        }

        $('#bannerInfo').text(subGroupTitle)
        $('#bannerDisplay').html(bannerHTML)
    }

    function showAsset(aTag, multi) {
        hideInfo()

        // Load in first banner
        var bBuild = aTag.data('build')
        var bConcept = aTag.data('concept')
        var bWidth = parseInt(aTag.data('width'))
        var bHeight = parseInt(aTag.data('height'))
        var bType = aTag.data('type')
        var bLink = aTag.attr('href')
        var bMissing = !!aTag.data('missing')

        //https://projects.invisible.ink/_bannerReviewer/public/PLACEHOLDER/

        if (multi) var bannerHTML = $('#bannerDisplay').html()
        else var bannerHTML = ''

        bannerHTML += getAssetHTML(bType, bWidth, bHeight, bLink, bMissing)

        $('#bannerDisplay').html(bannerHTML)

        // Load in banner info
        if (!multi) {
            var bInfoString = aTag.data('title')
            $('#bannerInfo').text(bInfoString)
        } else {
            $('#bannerInfo').text('')
        }
    }
    function removeAsset() {
        $('#bannerInfo').text('')
        $('#bannerDisplay').html('')
    }

    function getAssetHTML(
        assetType,
        assetWidth,
        assetHeight,
        assetLink,
        missing
    ) {
        var assetHTML = ''

        if (missing) {
            var id =
                'iframe-' +
                new Date().getTime() +
                '-' +
                Math.round(Math.random() * 10000)
            assetHTML +=
                "<iframe id='" +
                id +
                "' src='" +
                '/_bannerReviewer/public/PLACEHOLDER/' +
                "' allowTransparency='true' scrolling='no' seamless></iframe>"

            setTimeout(function () {
                $('#' + id).width(assetWidth)
                $('#' + id).height(assetHeight)
            }, 0)

            return assetHTML
        }

        if (assetType == 'swf') {
            // Is there a path?
            var swfPath = assetLink.split('/')
            var swfPathString = ''

            if (swfPath.length > 1) {
                for (var i = 0; i < swfPath.length - 1; i++) {
                    swfPathString += swfPath[i] + '/'
                }
            }

            var clickTagUrl = 'http://projects.invisible.ink/clickTAG'
            clickTagUrl = encodeURIComponent(clickTagUrl)

            assetHTML +=
                "<object type='application/x-shockwave-flash' data='" +
                assetLink +
                "' width='" +
                assetWidth +
                "' height='" +
                assetHeight +
                "'>\
				<param name='movie' value='" +
                assetLink +
                "' />\
				<param name='quality' value='high'/>\
				<param name='bgcolor' value='#ededed' />\
				<param name='base' value='" +
                swfPathString +
                "' />\
				<param name='FlashVars' value='clickTAG=" +
                clickTagUrl +
                "' />\
			</object>"
        } else if (assetType == 'html') {
            var id =
                'iframe-' +
                new Date().getTime() +
                '-' +
                Math.round(Math.random() * 10000)
            assetHTML +=
                "<iframe id='" +
                id +
                "' src='" +
                assetLink +
                '?clickTag=' +
                encodeURIComponent(
                    'https://projects.invisible.ink/clickTag/generic.html'
                ) +
                "' allowTransparency='true' scrolling='no' seamless></iframe>"

            setTimeout(function () {
                $('#' + id).width(assetWidth)
                $('#' + id).height(assetHeight)
            }, 0)
        } else if (assetType == 'video') {
            assetLink += '?' + Math.random()
            assetHTML =
                "<video src='" +
                assetLink +
                "' width='" +
                assetWidth +
                "' height='" +
                assetHeight +
                "' autoplay controls/>"
        } else {
            assetLink += '?' + Math.random()
            assetHTML =
                "<img src='" +
                assetLink +
                "' width='" +
                assetWidth +
                "' height='" +
                assetHeight +
                "' />"
        }

        return assetHTML
    }

    function openMenu(titleEl, showAll) {
        const $titleEl = $(titleEl)

        closeAll()

        // "Activate" button
        $titleEl.addClass('buildClicked')
        $titleEl.find('.build-titlePlus').addClass('buildClicked-plus')

        // Open menu
        $('.build-menu').css({ 'overflow-y': 'hidden' })

        // Set menu height
        var contentsHeight = $titleEl
            .parents('.build')
            .find('.build-menu')[0].scrollHeight

        maxMenuHeight = 300
        if (singleTLGMode) maxMenuHeight = 1000000

        if (contentsHeight > maxMenuHeight) {
            $titleEl
                .parents('.build')
                .find('.build-menu')
                .css({
                    height: maxMenuHeight + 'px',
                    'overflow-y': singleTLGMode ? 'visible' : 'auto',
                })
        } else {
            $titleEl
                .parents('.build')
                .find('.build-menu')
                .css({
                    height: contentsHeight + 'px',
                    'overflow-y': 'hidden',
                })
        }

        // Open ALL?
        // if (e.shiftKey) {
        if (showAll) {
            var allSizes = $titleEl
                .parent()
                .parent()
                .find('.build-menu a.banner-link')

            // Activate all links
            $('.build-menu a.banner-link').removeClass('sizeClicked')
            allSizes.toggleClass('sizeClicked')

            showAllAssets(allSizes, $titleEl.text())
        } else {
            let $firstA = $titleEl.parents('.build').find('.build-menu a:first')
            $firstA.toggleClass('sizeClicked')
            showAsset($firstA)
        }
    }

    function closeAll() {
        $('.build-title').removeClass('buildClicked')
        $('.build-titlePlus').removeClass('buildClicked-plus')
        $('.build-menu').css({ height: '0px' })

        removeAsset()
    }

    var isShowingInfo = false
    function showInfo() {
        isShowingInfo = true
        $(document.body).addClass('show-info')
    }
    function hideInfo() {
        isShowingInfo = false
        $(document.body).removeClass('show-info')
    }
    function toggleInfo() {
        if (isShowingInfo) {
            hideInfo()
        } else {
            showInfo()
        }
    }

    window.toggleInfo = function () {
        toggleInfo()
    }

    // ensure that the clickTags are going to the INK clickTag verify

    // it does this over and over every 10th of a second
    setInterval(function () {
        var iframeEls = Array.from(document.querySelectorAll('iframe'))

        iframeEls.forEach(function (iframeEl) {
            // if (iframeEl.contentWindow && iframeEl.contentWindow.clickTag) {
            if (iframeEl.contentWindow) {
                iframeEl.contentWindow.clickTag = clickTag
            }
        })
    }, 100)
}

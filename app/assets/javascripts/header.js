$(function(){
  var CategoryHTML = `<div class="search">
                    <ul class="category clearfix">
                      <span class="category__title bold">Airbnbで探す</span>
                      <li class="category__tag">
                        <a href="/" class="category__tag__link bold">すべて</a>
                      </li>
                      <li class="category__tag">
                        <a href="/" class="category__tag__link bold">宿泊先</a>
                      </li>
                      <li class="category__tag">
                        <a href="/" class="category__tag__link bold">体験</a>
                      </li>
                    </ul>
                    <ul class="recentry_search">
                      <span class="category__title bold">最近の検索</span>
                    </ul>
                    <ul class='search__lists'>
                      <li class='search__lists__result'>
                        <span>アムステルダム、オランダの宿泊先</span>
                      </li>
                      <li class='search__lists__result'>
                        <span>アムステルダム、オランダの体験</span>
                      </li>
                      <li class='search__lists__result'>
                        <span>アムステルダム、オランダ</span>
                      </li>
                    </ul>
                  </div>`
  function buildFrameHTML(lists){
    html =  `<div class='search'>
              <ul class='search__lists'>
                ${lists}
              </ul>
            </div>`
    return html
  }
  function buildHTML(home){
    html = `<li class='search__lists__result'>
              <span>${home.prefecture},${home.country}</span>
            </li>
            `
    return html
  }

  var searchField = $('#search-field')
  var searchResult = $('.navibar__search__result')
  searchField.on('click', function(e){
    searchResult.append(CategoryHTML)
  });
  searchField.on('keyup', function(){
    var input = searchField.val();
    if(input.length === 0 ){
      // searchResult.append(CategoryHTML)
    }
    else {
      $.ajax({
        url: '/search',
        type: "GET",
        data: {q: input},
        dataType: 'json'
      })
      .done(function(homes){
        var insertHTML = '';
        searchResult.empty();
        console.log(homes)
        if (homes.length !== 0 ){
          homes.forEach(function(home){
            insertHTML += buildHTML(home)
          })
          resultLists = buildFrameHTML(insertHTML)
          searchResult.append(resultLists)
        }
        else {
          searchResult.empty();
        }
      })
      .fail(function(){
        alert('インクリに失敗しました')
      })
    }
  });
  $(document).on('click', function(e){
     if (!$(event.target).closest('#search-field').length){
      $('.search').hide();
    };
  });

  var navibarListContent = $('.navibar__list__content')
  var hideContent = $('.navigation')
  navibarListContent.on('click', function(){
    hideContent.addClass('hide'); //一度全てのhideContentにhideクラスを追加
    $('.navigation', this).removeClass('hide');
    return false
  });
  $(document).on('click', function(e){
    if (!$(event.target).closest(navibarListContent).length || $('#help-non-login').click()){
      hideContent.addClass('hide');
      return false
    };
  });
  $('.help__head__close').on('click', function(){
    hideContent.addClass('hide');
    return false
  })
});

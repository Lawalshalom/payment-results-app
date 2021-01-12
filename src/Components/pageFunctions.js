export default {
    handleFilterClicks: (e, array, setArray) => {
        let clone = array.slice();
        clone = clone.map(word => word.toLowerCase());
        let text = e.target.innerText.toLowerCase();
        if (text === clone[0]) return false;
        let index = clone.indexOf(text);
        let temp = array[index];
        array[index] = array[0];
        array[0] = temp;
        return setArray([array[0], ...array.slice(1).sort()]);
    },

    handlePagination: (num, setPage, pages) => {
      const form = document.getElementById("search-users");
      form.reset();
      const pageLinks = document.getElementsByClassName("page-item");

      for (let i = 0; i < pageLinks.length; i++){
          pageLinks[i].classList.remove("active");
      }
      pageLinks[num].classList.add("active");
      if (num > 1){
          pageLinks[0].classList.remove("disabled")
      }
      else pageLinks[0].classList.add("disabled");

      if ( pages && pages.length > 1){
          pageLinks[pageLinks.length -1].classList.remove("disabled")
      }
      else pageLinks[pageLinks.length -1].classList.add("disabled");

      let page = (num-1)*20;
      setPage(page)
    },

    handlePrev: (setPage) => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[1].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        const num = pageLinks.indexOf(elem);
        pageLinks[num].classList.remove("active");
        pageLinks[num-1].classList.add("active");

        if (num > 2){
            pageLinks[0].classList.remove("disabled")
        }
        else pageLinks[0].classList.add("disabled");

        if (pageLinks[num+1]){
            pageLinks[pageLinks.length -1].classList.remove("disabled")
        }
        else pageLinks[pageLinks.length -1].classList.add("disabled");

        let page = (num-2)*20;
        setPage(page)
    },

    handleNext: (setPage) => {
        const form = document.getElementById("search-users");
        form.reset();
        const pageLinks = [...document.getElementsByClassName("page-item")];
        if (pageLinks[pageLinks.length-2].classList.contains("active")) return;

        const elem = pageLinks.find(link => link.classList.contains("active"));
        const num = pageLinks.indexOf(elem);
        pageLinks[num].classList.remove("active");
        pageLinks[num+1].classList.add("active");

        if (num+1 > 1){
            pageLinks[0].classList.remove("disabled")
        }
        else pageLinks[0].classList.add("disabled");

        if (pageLinks[num+3]){
            pageLinks[pageLinks.length -1].classList.remove("disabled")
        }
        else pageLinks[pageLinks.length -1].classList.add("disabled");

        let page = (num)*20;
        setPage(page)
    },

    paginationArr: (users) => {
    const pagination = [];
      let i = Math.floor(users.length/20);
      while (i > -1){
          pagination.push(i);
          i-= 1;
      }
      if (users.length % 20 > 0){
          if (pagination.length < 1){
              pagination.push(1)
          }
          else pagination.unshift(pagination[0] +1)
      }
      pagination.pop();
      return pagination.reverse();
    },
    capitalizeText: (text) => {
        return [text[0].toUpperCase(), ...text.slice(1)].join("");
    }
}
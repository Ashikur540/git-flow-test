let data = [
    {
        "title": "First Repeater Title",
        "type": "one",
        "desc": "First Repeater Description Here.",
    },
    {
        "title": "Second Repeater Title",
        "type": "two",
        "desc": "Second Repeater Description Here.",
    },
    {
        "title": "Third Repeater Title",
        "type": "three",
        "desc": "Third Repeater Description Here.",
    }
]



const reapetersContainer = document.querySelector("#allreapeater")
const addBtn = document.querySelector("#add-")




showData(data,)
function showData(allData, activeIdx = allData.length - 1) {
    console.log("✨ ~ file: myscript.js:29 ~ showData ~ activeIdx:", activeIdx)
    
    let activeClass = ""

    reapetersContainer.innerHTML = `
${allData.map((data, i) => {
        if (activeIdx == i) {
            activeClass = "active-repeter"
        }
        else activeClass = ""

        const { title, type, desc } = data

        return `
        <div class="repeater-fields">
        <div class="repeater-head" onclick="expandRepeater(this,${i})">
          <div class="repeater-item-title">${title} #${i + 1}</div>
          <div class="repeater-item-remove" onclick="deleteRepeater(${i})">
            <span class="remove-icon">X</span>
          </div>
        </div>
        <div class="repeater-controls ${activeClass}">
          <div class="fild-area">
            <label>${title}</label>
            <input name="title" type="text" value=${title} />
          </div>
          <div class="fild-area">
            <label>Type</label>
            <select name="selectfield">
              <option value="one" ${type == "one" && "selected"}>Type One</option>
              <option value="two"  ${type == "two" && "selected"}>Type Two</option>
              <option value="three" ${type == "three" && "selected"}>Type Three</option>
            </select>
          </div>
          <div class="fild-area">
            <label>Description</label>
            <input name="decsription" type="text" value=${desc} />
          </div>
        </div>
      </div>
        `
    }).join(" ")
        }
   
   `

}


function expandRepeater(elem, index) {
    showData(data, index)
}

function deleteRepeater(id) {
    data = data.filter((singleData, i) => i != id)
    showData(data)
}

function addRepeater() {
    const newData = {
        "title": "Dummy Title",
        "type": "three",
        "desc": "Dummy Repeater Description Here.",
    }
    data.push(newData)
    showData(data)
}

addBtn.addEventListener("click", addRepeater)
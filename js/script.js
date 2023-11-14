"use strict";

const data = [
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
let activeIndex = data.length - 1;

const repeaterMarkupHtml = (item, index, activeIndex) => {
    const activeClass = +activeIndex === +index ? 'active-repeter' : '';
    return `<div class="repeater-fields" data-index="${index}">
        <div class="repeater-head">
            <div class="repeater-item-title">${item.title}</div>
            <div class="repeater-item-remove">
                <span class="remove-icon">X</span>
            </div>
        </div>
        <div class="repeater-controls ${activeClass}">
            <div class="fild-area">
                <label>Heading</label>
                <input name="heading" type="text" value="${item.title}" />
            </div>
            <div class="fild-area">
                <label>Type</label>
                <select name="selectfield">
                    <option value="one" ${item.type === 'one' ? 'selected' : ''}>Type One</option>
                    <option value="two" ${item.type === 'two' ? 'selected' : ''}>Type Two</option>
                    <option value="three" ${item.type === 'three' ? 'selected' : ''}>Type Three</option>
                </select>
            </div>
            <div class="fild-area">
                <label>Description</label>
                <input name="decsription" type="text" value="${item.desc}" />
            </div>
        </div>
    </div>`
}

const renderHtml = (data, activeIndex) => {
    const html = data.map((item, i) => {
        return repeaterMarkupHtml(item, i, activeIndex);
    }).join('');
    repeater.innerHTML = html;
}

const repeater = document.getElementById('allreapeater')
const repeaterHead = repeater.querySelectorAll('.repeater-head')
const repeaterRemove = repeater.querySelectorAll('.repeater-item-remove')

renderHtml(data, activeIndex)

/**
 * Click Event Listener To expand and remove repeater
 */  
repeater.addEventListener('click', function(e) {
    e.stopPropagation();
    const repeaterFields = e.target.closest('.repeater-fields')
    const repeaterControls=  repeaterFields.querySelector('.repeater-controls')
    const currentIndex = repeaterFields.dataset.index;
    if(e.target.classList.contains('repeater-head') || e.target.classList.contains('repeater-item-title')) {
        if(!repeaterControls.classList.contains('active-repeter')) {
            repeater.querySelectorAll('.repeater-controls').forEach(function(controls) {
                controls.classList.remove('active-repeter')
            })
            repeaterControls.classList.add('active-repeter')
        } else {
            repeaterControls.classList.remove('active-repeter')
        }
    }
    if(e.target.classList.contains('repeater-item-remove') || e.target.classList.contains('remove-icon')) {
        data.splice(currentIndex, 1)
        activeIndex = data.length - 1;
        renderHtml(data, activeIndex)
    }
})

/**
 * Change Event Listener to update Data
 */
repeater.addEventListener('change', function(e) {
    e.preventDefault();

    const repeaterFields = e.target.closest('.repeater-fields')
    const currentIndex = repeaterFields.dataset.index;
    if(e.target.name === 'heading') {
        data[currentIndex] = {...data[currentIndex], title: e.target.value}
        renderHtml(data, currentIndex)
    }
    if(e.target.name === 'selectfield') {
        data[currentIndex] = {...data[currentIndex], type: e.target.value}
        renderHtml(data, currentIndex)
    }
    if(e.target.name === 'decsription') {
        data[currentIndex] = {...data[currentIndex], desc: e.target.value}
        renderHtml(data, currentIndex)
    }
})

/**
 * Click Event Listener To add New Repeater
 */
document.getElementById('add-reapeter').addEventListener('click', function() {
    data.push({
        "title": `Repeater Title #${data.length + 1}`,
        "type": "one",
        "desc": `Repeater #${data.length + 1} Description Here.`,
    })
    activeIndex = data.length - 1;
    renderHtml(data, activeIndex)
})

/**
 * Get All Repeater Data To Log
 */
document.getElementById('get-reapeter-data').addEventListener('click', function() {
    console.log(data);
})
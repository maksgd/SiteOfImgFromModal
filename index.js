const createTemplate = (src, text) => {
    return `
    <div 
        class="slide"
        style="background-image: url(${src});"
        >
        <h3>${text}</h3>
    </div>
    `
}

const templateData = [
    {
        text: "Mazda",
        src: 'https://images.unsplash.com/photo-1487480769727-0c01c8d362b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80'
    },
    {
        text: "Lamborghini",
        src: 'https://images.unsplash.com/photo-1552176625-e47ff529b595?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        text: "Audi",
        src: 'https://images.unsplash.com/photo-1605515103460-70fa2080bd9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    },
    {
        text: "Ford Mustang",
        src: 'https://images.unsplash.com/photo-1603553219987-fff0d6b01479?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1106&q=80'
    },
    {
        text: "Toyota",
        src: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
]

const app = document.getElementById("app")
console.log(app)

templateData.forEach((node) => {
    app.innerHTML += createTemplate(node.src, node.text)
})



const btn = document.getElementById('btn')

const inputValues = new Array(10).fill('');

function inputNode (index) {
    return {
        type: 'primary', 
        handler(event) { 
            inputValues[index] = event.target.value 
            console.log(inputValues[index])
        }
    }
}


btn.addEventListener('click', () => {

    const modal = $.modal({ // чтобы быстрее писать в консоли.
        // title: titleValue,
        closable: true,
        bodyInputs: inputValues.map((_, index) => {
            return inputNode(index)
        }),
        footerButtons: [
            {text: 'Сгенерировать', type: 'primary', handler() {
                console.log('Primary btn clicked')
                modal.close()
            }},
            {text: 'Выход', type: 'danger', handler() {
                console.log('Danger btn clicked')
                modal.close()
            }}
        ]
    }) 

    modal.open()
})







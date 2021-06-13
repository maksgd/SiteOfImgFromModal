Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

// ============================================ Создание input
function _createModalInput(inputs = []) { 
    if (inputs.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-input')

    inputs.forEach(inp => { // Генерация кнопок
        const $inp = document.createElement('input')
        $inp.textContent = inp.text
        $inp.classList.add('input')
        $inp.classList.add(`input-${inp.type || 'secondary'}`)        
        $inp.oninput = inp.handler || noop 

        wrap.appendChild($inp)
    })

    return wrap
}


// ============================================ Создание footer
function _createModalFooter(buttons = []) { 
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => { // Генерация кнопок
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)        
        $btn.onclick = btn.handler || noop 

        wrap.appendChild($btn)
    })

    return wrap
}


function _createModal(options) {
    const DEFAULT_WIDTH = '500'
    const DEFAULT_CONTENT = 'Вставьте ссылки на изображения'
    const modal = document.createElement('div') 
    modal.classList.add('vmodal') //Для работы с ним в CSS
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${DEFAULT_WIDTH}px">

                <div class="modal-header">
                    <span class="modal-title">${'Modal W'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''} <!--Это крестик для закрытия-->
                </div>

                <div class="modal-body" data-content>
                    ${DEFAULT_CONTENT} <!-- Вставить контект, который прописан в index -->
                </div>



            </div>
        </div>
    `)
    const input = _createModalInput(options.bodyInputs)
    const footer = _createModalFooter(options.footerButtons)

    footer.appendAfter(modal.querySelector('[data-content]'))
    input.appendAfter(modal.querySelector('[data-content]'))
    
    document.body.appendChild(modal) // Добавление в DOM в боди модальное окно.
    return modal
}


$.modal = function(options) {    
        const ANIMATION_CL = 500
        const ANIMATION_OPEN = 1
        const $modal = _createModal(options) // const modal = document.createElement('div') - это он
        let closing = false // Делаем защиту от случайного вызова методов.
        let destroyed = false


    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            setTimeout(() => {
                !closing && $modal.classList.add('open') // Создание методов, чтобы писать в консоли modal.open для открытия окна.
            }, ANIMATION_OPEN)
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide') // Создание класса при вызове метода close
            setTimeout(() => {
                $modal.classList.remove('hide') // Удаление класса через 2 сек.
                closing = false
            }, ANIMATION_CL)
        },
    }

    const listener = event => {
        if (event.target.dataset.close) { // Если клик происходит там, после чего должно произойти закрытие. 
            modal.close()
        }
    }

    $modal.addEventListener('click', listener) 


    return Object.assign(modal, { // Добавление методов.
        destroy() { // Возможность удалять модальное окно без утечки памяти
            $modal.parantNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) { // Возсожность менять контент
        $modal.querySelector('[data-content]').innerHTML = html 
        }
    })
}
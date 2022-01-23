let initialState = []

const colback = (data) => {
    initialState = JSON.parse(data)
    return  initialState
}

function jsonOnLoad (collback)  {
    colback(this.contentWindow.document.body.textContent)
}

(() => {
    setTimeout(()=> {
        const querySelector = (selector) => {
            return document.querySelector(selector)
        }

        const tableButton = querySelector(".table__button")
        const theButtonWithTruth = querySelector(".button__true")
        const theButtonWithFalse = querySelector(".button__false")

        tableButton.addEventListener('click', () => getData())
        theButtonWithTruth.addEventListener('click', () => dataFilter(true))
        theButtonWithFalse.addEventListener('click', () => dataFilter(false))

        function getData() {
            createTable(initialState)                                                                            //the initialState is drawn completely
        }

        let aCopyOfTheState

        function dataFilter(boolean) {                                                                           //filters the array and passes it to the rendering
            aCopyOfTheState = initialState.filter(f => f.isActive === boolean)
            createTable(aCopyOfTheState)
        }

        function createTable(tableData) {                                                                        //creates and renders a table
            const tBody = document.getElementsByClassName('table__tbody');
            const tBodyContainer = document.querySelectorAll('.tbody__container')
            const tBodyTrChild = document.querySelectorAll('.tbody__trChild')

            if (tBodyContainer) {                                                                                //deletes old data from the table before rendering the table
                for (let i = 0; i < tBodyContainer.length; i++) {
                    tBodyContainer[i].remove()
                }
                for (let i = 0; i < tBodyTrChild.length; i++) {
                    tBodyTrChild[i].remove()
                }
            }

            for (let i = 0; i < tableData.length; i++) {                                                          //iterates through the incoming array

                let trTag;

                function creatTags(ObjectWithParameters) {                                                         //creates markup
                    ObjectWithParameters.commonNameForTheTrTag = document.createElement('tr');
                    ObjectWithParameters.commonNameForTheTrTag.className = ObjectWithParameters.assignAClassTagTr

                    ObjectWithParameters.commonNameForTheFirstTag = document.createElement('td');
                    ObjectWithParameters.commonNameForTheSecondTag = document.createElement('td');
                    ObjectWithParameters.commonNameForTheThirdTag = document.createElement('td');

                    ObjectWithParameters.commonNameForTheFirstTag.className = 'tbody__cell';
                    ObjectWithParameters.commonNameForTheSecondTag.className = 'tbody__cell';
                    ObjectWithParameters.commonNameForTheThirdTag.className = 'tbody__cell';

                    ObjectWithParameters.commonNameForTheFirstTag.innerHTML = ObjectWithParameters.assignInnerHTMLToTheFirstTag;
                    ObjectWithParameters.commonNameForTheSecondTag.innerHTML = ObjectWithParameters.assignInnerHTMLToTheSecondTag;
                    ObjectWithParameters.commonNameForTheThirdTag.innerHTML = ObjectWithParameters.assignInnerHTMLToTheThirdTag;


                    ObjectWithParameters.commonNameForTheTrTag.append(
                        ObjectWithParameters.commonNameForTheFirstTag,
                        ObjectWithParameters.commonNameForTheSecondTag,
                        ObjectWithParameters.commonNameForTheThirdTag
                    );
                    ObjectWithParameters.nameBody.append(ObjectWithParameters.commonNameForTheTrTag);

                    return trTag = ObjectWithParameters.commonNameForTheTrTag
                }

                creatTags({
                    commonNameForTheTrTag : 'commonNameForTheTrTag',
                    assignAClassTagTr: 'tbody__container',
                    commonNameForTheFirstTag: 'TheTdTagWillHaveTheName',
                    commonNameForTheSecondTag: 'TheTdTagWillHaveTheBalance',
                    commonNameForTheThirdTag: 'TheTdTagWillHaveTheEmail',
                    assignInnerHTMLToTheFirstTag: tableData[i].name,
                    assignInnerHTMLToTheSecondTag: tableData[i].balance,
                    assignInnerHTMLToTheThirdTag: tableData[i].email,
                    nameBody : tBody[0],
                });

                const parentTrTag = trTag;

                creatTags({
                    commonNameForTheTrTag : 'childTagTr',
                    assignAClassTagTr: 'tbody__trChild',
                    commonNameForTheFirstTag: 'TheTdTagWillHaveTheId',
                    commonNameForTheSecondTag: 'TheTdTagWillHaveTheParentId',
                    commonNameForTheThirdTag: 'TheTdTagWillHaveTheIsActive',
                    assignInnerHTMLToTheFirstTag: ('id: ' + tableData[i].id),
                    assignInnerHTMLToTheSecondTag: ('parentId: ' + tableData[i].parentId),
                    assignInnerHTMLToTheThirdTag: ('isActive: ' + tableData[i].isActive),
                    nameBody : tBody[0],
                })

                parentTrTag.addEventListener('click', function () {
                    parentTrTag.classList.toggle('_active')
                    const trChildRemove = parentTrTag.nextSibling
                    trChildRemove.classList.toggle('_active')
                });
            }
        }
    },0)
})()



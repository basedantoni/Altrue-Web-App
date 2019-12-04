class UI {
    constructor() {
        this.init();
    }

    init() {
        this.printCategories();

        this.result = document.getElementById('result');
    }

    displayEvents(events) {
        let HTMLTemplate = '';

        events.forEach(eventInfo => {
            HTMLTemplate += '
                <div class="col-md-4 mt-4>
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}">
                        </div>
                        <div class ="card-body">
                            <div class="card-text">
                                <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                                <p class="lead text-info">Event Information:</p>
                                <p>${eventInfo.description.text.substring(0,200)}...</p>
                                <span class="badge badge-primary">Capacity: ${eventInfo.capacity}</span>
                                <span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>

                                <a href=""></a>
                    </div>
                </div>
            ';

        });

        this.result.innerHTML = HTMLTemplate;
    }

    printCategories() {
        const categoriesList = Eventbrite.getCategoriesAPI()
            .then(categories => {
                const categoriesList = categories.categories.categories;
                const categoriesSelect = document.querySelector('#category');

                categoriesList.forEach(category =? {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.appendChild(document.createTextNode(category.name));
                    categoriesSelect.appendChild(option);
                })

            })



    removeMessage() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }
    }






}
new Vue({

    el: '#manage-vue',

    data: {
        items: [],
        pagination: {
            total: 0,
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        offset: 4,
        formErrors: {},
        formErrorsUpdate: {},
        newItem: {
            'name': '',
            'email': ''
        },
        fillItem: {
            'name': '',
            'email': '',
            'id': ''
        }
    },

    computed: {
        isActived: function() {
            return this.pagination.current_page;
        },
        pagesNumber: function() {
            if (!this.pagination.to) {
                return [];
            }
            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }
            var to = from + (this.offset * 2);
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }
            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        }
    },

    ready: function() {
        this.getVueItems(this.pagination.current_page);
    },

    methods: {

        getVueItems: function(page) {
            this.$http.get('/api/v1/candidates?page=' + page).then((response) => {                
                this.$set('items', response.data.data.data);
                this.$set('pagination', response.data.pagination);
            });
        },

        createItem: function() {
            var input = this.newItem;
            this.$http.post('/api/v1/candidate', input).then((response) => {
                this.changePage(this.pagination.current_page);
                this.newItem = {
                    'name': '',
                    'email': ''
                };
                $("#create-item").modal('hide');
                toastr.success('Candidato Adicionado com Sucesso.', 'Success Alert', {
                    timeOut: 5000
                });
            }, (response) => {
                this.formErrors = response.data;
            });
        },

        deleteItem: function(item) {
            this.$http.delete('/api/v1/candidate/' + item.id).then((response) => {
                this.changePage(this.pagination.current_page);
                toastr.success('Candidato Excluído com Sucesso.', 'Success Alert', {
                    timeOut: 5000
                });
            });
        },

        editItem: function(item) {
            this.fillItem.name = item.name;
            this.fillItem.id = item.id;
            this.fillItem.email = item.email;
            $("#edit-item").modal('show');
        },

        updateItem: function(id) {
            var input = this.fillItem;
            this.$http.put('/api/v1/candidate/' + id, input).then((response) => {
                this.changePage(this.pagination.current_page);
                this.fillItem = {
                    'name': '',
                    'email': '',
                    'id': ''
                };
                $("#edit-item").modal('hide');
                toastr.success('Candidato Atualizado com Sucesso.', 'Success Alert', {
                    timeOut: 5000
                });
            }, (response) => {
                this.formErrorsUpdate = response.data;
            });
        },

        changePage: function(page) {
            this.pagination.current_page = page;
            this.getVueItems(page);
        }

    }

});
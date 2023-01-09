import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => ({
        kabanData: [],
        accessToken: null,
        apiPrefix: 'https://be-bemo.herokuapp.com/api',
        apiHost: 'https://be-bemo.herokuapp.com',
        isLoading: false,
        csrf: '',
        apiDefaultHeaders: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    }),
    getters: {
        getIsLoading() {
            return this.isLoading;
        },
        isSessionActive() {
            return (this.accessToken !== null &&
                typeof this.accessToken == 'string' &&
                this.accessToken.trim().length > 0) ? true : false;
        },
        getKabanData() {
            return this.kabanData;
        }
    },
    actions: {
        toggleLoading() {
            return this.isLoading = !this.isLoading;
        },
        async csrf() {
            await fetch(`${this.apiHost}/sanctum/csrf-cookie`);
        },

        async createSession() {
            this.toggleLoading();
            await fetch(`${this.apiPrefix}/access_token`)
                .then(response => response.json())
                .then(response => {
                    this.updateAccessToken(response.token);
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        async loginExistingSession(token) {
            this.toggleLoading();
            await fetch(`${this.apiPrefix}/access_token/check?access_token=${token}`)
                .then(response => response.json())
                .then(response => {
                    this.updateAccessToken(response.token);
                    this.fetchColumns();
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        updateAccessToken(value) {
            this.accessToken = value;
            if (this.accessToken == null) {
                this.kabanData = [];
            }
        },

        async fetchColumns() {
            this.toggleLoading();
            await fetch(`${this.apiPrefix}/columns?access_token=${this.accessToken}`)
                .then(response => response.json())
                .then(response => {
                    this.kabanData = response;
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        async addNewColumn(data) {
            if (data.title.trim().length === 0) return;

            this.toggleLoading();
            await fetch(`${this.apiPrefix}/column`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: data.title,
                        token: this.accessToken
                    }),
                    headers: {
                        ...this.apiDefaultHeaders
                    }
                })
                .then(response => response.json())
                .then(response => {
                    let template = {
                        ...response.column,
                        cards: []
                    }
                    this.kabanData.push(template);
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        async deleteColumn(columnId) {
            if (!columnId) return;

            this.toggleLoading();
            await fetch(`${this.apiPrefix}/column/${columnId}`, {
                    method: "DELETE",
                    headers: {
                        ...this.apiDefaultHeaders
                    }
                })
                .then(response => response.json())
                .then(response => {
                    let columnIndex = this.kabanData.findIndex((item) => {
                        return item.id == columnId;
                    });

                    this.kabanData.splice(columnIndex, 1);
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        async createNewCard(data) {
            if (data.title.trim().length == 0) return;
            if (data.description.trim().length == 0) return;
            if (!data.kaban_column_id) return;

            this.toggleLoading();
            await fetch(`${this.apiPrefix}/card`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        ...this.apiDefaultHeaders
                    }
                })
                .then(response => response.json())
                .then(response => {
                    let columnIndex = this.kabanData.findIndex((item) => {
                        return item.id == data.kaban_column_id;
                    })
                    this.kabanData[columnIndex].cards.push(response.card);
                })
                .catch(error => {

                });
            this.toggleLoading();
        },

        async updateCardPositions() {
            await fetch(`${this.apiPrefix}/cardPositions`, {
                    method: "PATCH",
                    body: JSON.stringify({ data: this.kabanData }),
                    headers: {
                        ...this.apiDefaultHeaders
                    }
                })
                .then(response => response.json())
                .then(response => {})
                .catch(error => {

                });
        },

        async updateCard(data) {
            if (!data.id) return;
            if (data.title.trim().length == 0) return;
            if (data.title.trim().description == 0) return;
            await fetch(`${this.apiPrefix}/card/${data.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        ...this.apiDefaultHeaders
                    }
                })
                .then(response => response.json())
                .then(response => {
                    let { card } = response;
                    kabanIndex = this.kabanData.findIndex((item) => {
                        return item.id == card.kaban_column_id;
                    });
                    cardIndex = this.kabanData[kabanIndex].cards.findIndex((item) => {
                        return item.id == card.id;
                    });
                    this.kabanData[kabanIndex].cards[cardIndex] = card;
                })
                .catch(error => {

                });
        },
    },
});
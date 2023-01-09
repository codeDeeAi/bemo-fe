<template>
    <li @click="toggleModal('showCardModal', `${reactiveCardData.id}-show-card-modal`)" class="kaban__card">
        <p class="title">{{ cardData.title }}</p>

        <!-- Show Card Modal -->
        <modal :name="`${cardData.id}-show-card-modal`" :height="330" :width="400">
            <div class="form__container">
                <div class="error" v-if="errors.length > 0" v-for="(error, errorIndex) in errors" :key="errorIndex">
                    {{ error }}
                </div>
                <label for="card_name">Title</label>
                <input type="text" name="card_name" v-model="reactiveCardData.title">

                <label for="card_description">Description</label>
                <input type="text" name="card_description" v-model="reactiveCardData.description">

                <div class="footer">
                    <button type="button" @click="updateDetails()">Update Card</button>
                </div>
            </div>
        </modal>
        <!-- Show Card Modal End -->
    </li>
</template>
<script>
import { useMainStore } from '@/stores/index'
export default {
    name: 'KabanContainer',
    props: {
        cardData: {
            required: true,
            type: Object
        }
    },
    watch: {
        reactiveCardData() { },
        cardData() {

        }
    },
    data() {
        return {
            store: useMainStore(),
            reactiveCardData: this.cardData,
            showCardModal: false,
            errors: [],
        }
    },
    methods: {
        toggleModal(ref, name) {
            if (this[ref]) return this.$modal.hide(name);
            return this.$modal.show(name);
        },

        updateDetails() {
            this.errors = [];
            if (!this.reactiveCardData.id) return;
            if (this.reactiveCardData.title.trim().length == 0) return this.errors.push('Title is required !');
            if (this.reactiveCardData.description.trim().length == 0) return this.errors.push('Description is required !');
            this.store.updateCard({
                ...this.reactiveCardData
            });
            this.toggleModal('showCardModal', `${this.cardData.id}-show-card-modal`)
        }
    },
}
</script>
<style  lang="scss" scoped>
/* Fira Sans */
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

.kaban__card {
    display: block;
    position: relative;
    list-style: none;
    font-family: "Fira Sans", "Roboto", "Helvetica", "Arial", sans-serif;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: #fafafa;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin: 5px 0;

    &:hover {
        color: #00838F;
        cursor: pointer;
        will-change: box-shadow;
        transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
        box-shadow: 0 5px 6px 0 rgba(0, 0, 0, .14), 0 3px 1px -6px rgba(0, 0, 0, .2), 2px 5px 3px 0 rgba(0, 0, 0, .12);
    }

    .title {
        align-self: flex-end;
        color: inherit;
        display: block;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        line-height: normal;
        overflow: hidden;
        -webkit-transform-origin: 149px 48px;
        transform-origin: 149px 48px;
        margin: 0;

    }

    // .text {
    //     color: grey;
    //     border-top: 1px solid;
    //     font-size: 1rem;
    //     font-weight: 400;
    //     line-height: 18px;
    //     overflow: hidden;
    //     padding: 16px;
    //     width: 90%;
    // }

    // .actions {
    //     border-top: 1px solid rgba(0, 0, 0, .1);
    //     font-size: 8px;
    //     line-height: normal;
    //     width: 100%;
    //     color: #B0BEC5;
    //     padding: 8px;
    //     box-sizing: border-box;
    //     margin-top: 10px;
    //     display: flex;
    //     justify-content: end;
    //     gap: 5px;

    //     button {
    //         margin-top: auto;
    //         margin-bottom: auto;
    //         letter-spacing: 1;
    //         overflow: hidden;
    //         outline: none;
    //         cursor: pointer;
    //         align-items: center;
    //         background-color: #EEEEEE;
    //         box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
    //         border: 1px solid #ccc;
    //         border-radius: 2px;
    //         color: #607D8B;
    //         position: relative;
    //         padding: .5rem .7rem;
    //         display: inline-block;
    //         font-size: 11px;
    //         font-weight: 600;
    //         text-transform: uppercase;
    //         text-decoration: none;

    //         &:active,
    //         &:down,
    //         &:focus {
    //             box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .12);
    //             color: #00838F;
    //         }

    //         &:hover {
    //             color: #00838F;
    //             will-change: box-shadow;
    //             transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
    //             box-shadow: 0 5px 6px 0 rgba(0, 0, 0, .14), 0 3px 1px -6px rgba(0, 0, 0, .2), 2px 5px 3px 0 rgba(0, 0, 0, .12);
    //         }
    //     }
    // }
}

.form__container {

    padding: 2.5rem;

    label {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: larger;
    }

    input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .error {
        color: red;
        font-size: small;
        background-color: lightcoral;
        padding: 4px;
        margin-bottom: 4px;
        border-radius: 3px;
    }

    .footer {
        display: flex;
        justify-content: end;

        button {
            color: #f2f2f2;
            text-decoration: none;
            padding: 12px;
            background-color: #111;

            &:hover {
                background-color: #333;
                cursor: pointer;
            }
        }
    }
}
</style>
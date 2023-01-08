<template>
    <div class="kaban__container">
        <ol class="kanban">
            <div class="kanban__title">
                <h2>{{ columnData.title }}</h2>
                <button type="button" @click="store.deleteColumn(columnData.id)">Delete</button>
            </div>
            <draggable v-model="columnData.cards" group="people" @start="drag = true" @end="drag = false">
                <KabanCard v-for="(card, index) in columnData.cards" :key="index" :cardData="card" />
            </draggable>
            <div class="actions">
                <button type="button" @click="toggleModal('showAddCardModal', `${columnIndex}-add-new-card-modal`)">Add
                    Card</button>
            </div>
        </ol>

        <!-- Add New Card Modal -->
        <modal :name="`${columnIndex}-add-new-card-modal`" :height="330" :width="400">
            <div class="form__container">
                <div class="error" v-if="newCardDetails.errors.length > 0"
                    v-for="(error, errorIndex) in newCardDetails.errors" :key="errorIndex">
                    {{ error }}
                </div>
                <label for="card_name">Title</label>
                <input type="text" name="card_name" v-model="newCardDetails.title">

                <label for="card_description">Description</label>
                <input type="text" name="card_description" v-model="newCardDetails.description">

                <div class="footer">
                    <button type="button" @click="createNewCard" :disabled="isCreatingCard" :loading="isCreatingCard">
                        {{ (isCreatingCard) ? 'loading ...' : 'Create New Card' }}</button>
                </div>
            </div>
        </modal>
        <!-- Add New Card Modal End -->
    </div>
</template>
<script>
import KabanCard from './KabanCard.vue';
import draggable from 'vuedraggable'
import { useMainStore } from '@/stores/index'
export default {
    name: 'KabanColumn',
    props: {
        columnData: {
            required: true,
            type: Object
        },
        columnIndex: {
            required: true,
            type: String | Number
        },
        isCreatingCard: {
            type: Boolean,
            default: false
        }
    },
    components: {
        KabanCard,
        draggable
    },
    data() {
        return {
            store: useMainStore(),
            showAddCardModal: false,
            showCardDetailsModal: false,
            newCardDetails: {
                errors: [],
                title: "",
                description: "",
            }
        }
    },
    methods: {
        toggleModal(ref, name) {
            if (this[ref]) return this.$modal.hide(name);
            return this.$modal.show(name);
        },

        createNewCard() {
            this.newCardDetails.errors = [];
            if (this.newCardDetails.title.trim().length == 0) return this.newCardDetails.errors.push('Title is required !');
            if (this.newCardDetails.description.trim().length == 0) return this.newCardDetails.errors.push('Description is required !');
            this.store.createNewCard({
                ...this.newCardDetails,
                kaban_column_id: this.columnData.id
            });
            this.toggleModal('showAddCardModal', `${this.columnIndex}-add-new-card-modal`)
        }
    },
}
</script>
<style  lang="scss" scoped>
/* Fira Sans */
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

.kaban__container {
    top: 88px;
    position: relative;
    display: block;
    list-style: none;
    font-family: "Fira Sans", 'Arbutus Slab', serif;
    // overflow-y: auto;
    overflow-x: hidden;
    width: 300px !important;


    ol {
        transition: border-color 2s ease, all 0.1s ease;
        border-top: 5px solid #78909C;
        height: auto;
        margin: 1%;
        width: 250px !important;
        display: inline-block;
        vertical-align: top;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
        flex-direction: column;
        position: relative;
        background: #fff;
        padding: 1em;
        border-radius: 2px;

        .kanban__title {
            display: flex;
            justify-content: space-between;

            h2 {
                color: #607D8B;
            }

            button {
                margin-top: auto;
                margin-bottom: auto;
                letter-spacing: 1;
                overflow: hidden;
                outline: none;
                cursor: pointer;
                align-items: center;
                background-color: #EEEEEE;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
                border: 1px solid #ccc;
                border-radius: 2px;
                color: #607D8B;
                position: relative;
                padding: .5rem .7rem;
                display: inline-block;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                text-decoration: none;

                &:active,
                &:down,
                &:focus {
                    box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .12);
                    color: #00838F;
                }
            }
        }
    }

    .actions {
        border-top: 1px solid rgba(0, 0, 0, .1);
        font-size: 8px;
        line-height: normal;
        width: 100%;
        color: #B0BEC5;
        padding: 8px;
        box-sizing: border-box;
        margin-top: 20px;
        display: flex;
        justify-content: start;
        gap: 5px;

        button {
            margin-top: auto;
            margin-bottom: auto;
            letter-spacing: 1;
            overflow: hidden;
            outline: none;
            cursor: pointer;
            align-items: center;
            background-color: #EEEEEE;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
            border: 1px solid #ccc;
            border-radius: 2px;
            color: #607D8B;
            position: relative;
            padding: .5rem .7rem;
            display: inline-block;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            text-decoration: none;

            &:active,
            &:down,
            &:focus {
                box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .12);
                color: #00838F;
            }
        }
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

}
</style>
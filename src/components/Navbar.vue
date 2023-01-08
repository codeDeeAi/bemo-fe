<template>
    <nav>
        <ul>
            <li>
                <button type="button" v-if="!store.isSessionActive" @click="store.createSession()">
                    <span>Create Session</span>
                </button>
            </li>
            <li>
                <button type="button" v-if="!store.isSessionActive" @click="toggleLoginModal">
                    <span>Enter Session Key</span>
                </button>
            </li>
            <li>
                <button type="button" v-if="store.isSessionActive" @click="toggleAddColumnModal">
                    <span>Add Column</span>
                </button>
            </li>
            <li>
                <button type="button" v-if="store.isSessionActive" @click="copyToClipboard(store.accessToken)">
                    <span>Session: {{ store.accessToken }}</span>
                </button>
            </li>
            <li>
                <button type="button" v-if="store.isSessionActive" @click="store.updateAccessToken(null)">
                    <span>Clear Session</span>
                </button>
            </li>

        </ul>
        <!-- Create Column Modal -->
        <modal name="add-new-column-modal" :height="230" :width="400">
            <div class="form__container">
                <div class="error" v-if="formError" v-text="formError">

                </div>
                <label for="column_name">Title</label>
                <input type="text" name="column_name" v-model="newColumnTitle">

                <div class="footer">
                    <button type="button" @click="createNewColumn" :disabled="isCreatingColumn"
                        :loading="isCreatingColumn">
                        {{ (isCreatingColumn) ? 'loading ...' : 'Create New Column' }}</button>
                </div>
            </div>
        </modal>
        <!-- Create Column Modal Ends -->
        <!-- Login Modal -->
        <modal name="login-modal" :height="230" :width="400">
            <div class="form__container">
                <div class="error" v-if="loginFormError" v-text="loginFormError">

                </div>
                <label for="access_token">Access Token</label>
                <input type="text" name="access_token" v-model="sessionKey">

                <div class="footer">
                    <button type="button" @click="login()">
                        {{ 'Login' }}</button>
                </div>
            </div>
        </modal>
        <!-- Login Modal Ends -->
    </nav>
</template>
<script>
import { useMainStore } from '@/stores/index'
export default {
    name: 'Navbar',
    props: {
        isCreatingColumn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showModal: false,
            showLoginModal: false,
            formError: "",
            loginFormError: "",
            newColumnTitle: "",
            sessionKey: "",
            store: useMainStore()
        }
    },
    mounted() {
    },
    methods: {
        toggleAddColumnModal() {
            if (this.showModal) return this.$modal.hide('add-new-column-modal');
            return this.$modal.show('add-new-column-modal');
        },

        toggleLoginModal() {
            if (this.showLoginModal) return this.$modal.hide('login-modal');
            return this.$modal.show('login-modal');
        },

        createNewColumn() {
            this.formError = "";
            if (this.newColumnTitle.trim().length == 0) return this.formError = "Title is required!";

            this.store.addNewColumn({ title: this.newColumnTitle })

            this.newColumnTitle = "";
        },

        login() {
            this.loginFormError = "";
            if (this.sessionKey.trim().length == 0) return this.loginFormError = "Access Token is required!";

            this.store.loginExistingSession(this.sessionKey)

            this.sessionKey = "";

            this.toggleLoginModal();
        },

        copyToClipboard(value, message = 'Copied to clipboard') {
            navigator.clipboard.writeText(value);
            alert(`${message} : ${value}`);
        }
    },
}
</script>
<style lang="scss" scoped >
/* Fira Sans */
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

/** NAVIGATION BAR */
nav {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;

    ul {
        text-align: start;
        list-style-type: none;
        list-style-type: none;
        margin: 0;
        padding: 15px;

        li {
            display: inline;
            font-family: "Fira Sans", sans-serif;
            font-size: 17px;
            margin-right: 4px;

            button {
                color: #f2f2f2;
                text-decoration: none;
                padding: 14px;

                span {
                    color: #111;
                }

                &:hover {
                    background-color: #111;
                    cursor: pointer;

                    span {
                        color: #f2f2f2;
                    }
                }
            }
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
</style>
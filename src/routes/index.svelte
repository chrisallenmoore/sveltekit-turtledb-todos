<script>
    import { onMount } from "svelte";
    import { mydb } from "$lib/db";
    import { browser } from "$app/env";

    onMount(async () => {
        //let TurtleDB = (await import("turtledb")).default;
    });

    if (browser) {
        //mydb.create({ _id: "thirdTurtle", species: "Sea Turtle" });
        //mydb.read("firstTurtle").then((doc) => console.log(doc));
    }

    let addTodoItem = () => {
        let todoItem = document.getElementById("todoItem");
        browser && mydb.create({ item: todoItem.value });
        todoItem.value = "";
        console.log("todo button clicked");
        getTodos();
    };

    /*let todos = [
        { _id: "J---aiyznGQ", item: "Keyboard Cat" },
        { _id: "z_AbfPXTKms", item: "Maru" },
        { _id: "OUtn3pvWmpg", item: "Henri The Existential Cat" },
    ];*/

    let todos = [];
    /*let getTodos = async () => {
        todos =
            browser &&
            mydb.readAll().then((todos) => {
                todos.push(todos.length + 1);
                todos = todos;
                return todos;
            });
        console.table(todos);
    };*/

    async function getTodos() {
        todos =
            browser &&
            mydb.readAll().then((todos) => {
                todos.push(todos.length + 1);
                todos = todos;
                return todos;
            });
        console.table(todos);
    }
    getTodos();
</script>

<div class="p-4">
    <h1 class="text-xl">TurtleDB Todo App</h1>
</div>
<div class="p-4">
    <input
        name="todoItem"
        id="todoItem"
        type="text"
        class="outline rounded-sm"
        placeholder="Add a todo item"
    /><button class="outline rounded-sm" on:click={() => addTodoItem()}
        >Add Todo Item</button
    >
</div>

<div class="p-4 bg-slate-200">
    <p>My todos:</p>
    <ul>
        {#await todos}
            <p>loading...</p>
        {:then todos}
            {#each todos as todo}
                <li>{todo.item}</li>
            {/each}
        {:catch error}
            <p>error</p>
        {/await}
    </ul>
</div>

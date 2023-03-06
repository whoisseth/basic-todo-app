/** @format */

import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import { AiFillDelete } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSignal, useComputed } from "@preact/signals-react";

interface TodoType {
  id?: string | number;
  task?: string | undefined;
  done?: boolean;
}

const Home: NextPage = () => {
  const [animationParent] = useAutoAnimate();

  const templateTodo: TodoType[] = [
    {
      id: 1,
      task: "Todo 1",
      done: false
    },
    {
      id: 2,
      task: "Todo 2",
      done: true
    }
  ];

  
  const todo = useSignal(templateTodo);
  // const [todo, setTodo] = useState(templateTodo);
  const [enterTodo, setEnterTodo] = useState("");

  function addTodo(e: React.SyntheticEvent) {
    e.preventDefault();
    // if (enterTodo != "" && !todo[].includes(enterTodo))
    if (enterTodo != "" && !todo.value.find((d) => d.task === enterTodo))
      todo.value = [
        ...todo.value,
        {
          id: crypto.randomUUID(),
          task: enterTodo,
          done: false
        }
      ];
    setEnterTodo("");
  }

  function removeTodo(todoID: string) {
    const filterTdo = todo.value.filter((d) => d.task != todoID);
    todo.value = [...filterTdo];
  }

  function handleToggleTask(todoID: string) {
    console.log("task-", todoID);

    const updatedTodos = todo.value.map((task) => {
      if (task.task === todoID) {
        return { ...task, done: !task.done };
      }
      return task;
    });

    todo.value = updatedTodos;
  }

  console.log("todo-", todo);

  return (
    <div className="flex min-h-screen   justify-center pt-4 pb-2 px-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" max-w-[600px] w-full    p-1">
        <form className="mb-4 flex gap-2" action="">
          <input
            className="border-[1px] px-2 rounded h-11 w-full border-gray-300 outline-gray-600  "
            type="text"
            placeholder="Enter To Do"
            autoComplete="on"
            autoCorrect="on"
            value={enterTodo}
            onChange={(e) => setEnterTodo(e.target.value)}
          />
          <button
            className="bg-green-400 whitespace-nowrap text-white px-4 rounded
            active:bg-opacity-90"
            onClick={addTodo}
            type="submit"
          >
            Add todo
          </button>
        </form>

        {/*  */}
        <section ref={animationParent} className="flex gap-1 flex-col ">
          <Todo
            {...{ handleToggleTask, removeTodo }}
            todos={todo.value.filter((todo) => todo.done == false)}
          />
          {/*  */}
          {!(
            todo.value.length < 0 ||
            todo.value.filter((todo) => todo.done == false).length == 0 ||
            todo.value.filter((todo) => todo.done == true).length == 0
          ) && (
            <div className="w-[95%]  mx-auto h-[.5px] rounded-full bg-gray-200" />
          )}
          <Todo
            {...{ handleToggleTask, removeTodo }}
            todos={todo.value.filter((todo) => todo.done == true)}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;

interface Todo {
  handleToggleTask: Function;
  removeTodo: Function;
  todos: TodoType[];
}

function Todo({ handleToggleTask, removeTodo, todos }: Todo) {
  return (
    <>
      {todos.map((data, i) => (
        <section className="flex justify-between gap-4 py-2">
          <button
            onClick={() => handleToggleTask(data.task)}
            className="flex gap-1 rounded  items-start border px-2 "
          >
            <input type="checkbox" checked={data.done} className="mt-1.5 " />
            <label
              className={clsx("cursor-pointer", {
                " line-through ": data.done
              })}
            >
              {data.task}
            </label>
          </button>
          <button onClick={() => removeTodo(data.task)} className="">
            <AiFillDelete className="text-red-400 text-2xl" />
          </button>
        </section>
      ))}
    </>
  );
}

import { test, expect } from '@playwright/test'

import { TaskModel } from './fixtures/task.model'

import { deleteTaskByHelper, postTask } from './support/helpers'

test('Cadastrar uma nova tarefa', async ({ page, request }) => {

    const task: TaskModel = {
        name: "Ler um livro de TypeScript",
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator(`css=.task-item p >> text=${task.name}`)
    await expect(target).toBeVisible()
})

test('Não deve permitir tarefa duplicada', async ({ page, request }) => {

    const task: TaskModel = {
        name: "Comprar ketchup",
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    await page.goto('http://localhost:3000')

    const inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    await inputTaskName.fill(task.name)

    await page.click('css=button >> text=Create')

    const target = page.locator('.swal2-html-container')
    await expect(target).toHaveText('Task already exists!')
})
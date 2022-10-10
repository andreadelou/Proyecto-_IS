// import Goals from "../pages/Goals"
import React from "react";
import * as firebaseHooks from "react-firebase-hooks/auth";
import * as goalsService from "../services/goals.service";
const { render, screen, fireEvent } = require("@testing-library/react");
const { act } = require("react-dom/test-utils");
const { BrowserRouter } = require("react-router-dom");
const { default: GoalModal } = require("../components/GoalModal");
const { default: TodoForm } = require("../components/TodoForm");
const { default: Goals } = require("../pages/Goals");

describe("Tests for the goals logic", () => {
    beforeEach(() => {
        // mockFirebase({currentUser: {email: 'Guillermo@gmail.com'}})
    });
    test("Fetch all goals when the user logs in", async () => {
        await act(async () => {
            render(<Goals />, { wrapper: BrowserRouter });
        });
    });

    test("Allows to save a goal if the fields are filled", async () => {
        // Arrange
        const onOpenMock = jest.fn().mockName("onOpen");
        const onCloseMock = jest.fn().mockName("onClose");

        await act(async () => {
            render(
                <GoalModal
                    isOpen={true}
                    onOpen={onOpenMock}
                    onClose={onCloseMock}
                />,
                { wrapper: BrowserRouter }
            );
        });
        const titleInput = screen.getByTestId("title");
        const categoryInput = screen.getByTestId("category");
        const reminderInput = screen.getByTestId("reminder");
        const saveButton = screen.getByTestId("save");
        // Act
        fireEvent.change(titleInput, { target: { value: "Goal Title" } });
        fireEvent.change(categoryInput, { target: { value: "health" } });
        fireEvent.change(reminderInput, { target: { value: "2022/09/27" } });
        // Assert
        expect(saveButton.closest("button").disabled).toBeFalsy();
    });

    test("Saves the goal when the user clicks the button.", async () => {
        // Arrange
        const onOpenMock = jest.fn().mockName("onOpen");
        const onCloseMock = jest.fn().mockName("onClose");
        const onSaveMock = jest.fn().mockName("onSave");

        await act(async () => {
            render(
                <GoalModal
                    isOpen={true}
                    onOpen={onOpenMock}
                    onSave={onSaveMock}
                    onClose={onCloseMock}
                />,
                { wrapper: BrowserRouter }
            );
        });
        const titleInput = screen.getByTestId("title");
        const categoryInput = screen.getByTestId("category");
        const reminderInput = screen.getByTestId("reminder");
        const saveButton = screen.getByTestId("save");
        // Act
        fireEvent.change(titleInput, { target: { value: "Goal Title" } });
        fireEvent.change(categoryInput, { target: { value: "health" } });
        fireEvent.change(reminderInput, { target: { value: "2022/09/27" } });
        fireEvent.click(saveButton);
        // Assert
        expect(onSaveMock).toHaveBeenCalled();
    });

    test("Clicking on the plus icon calls the method that creates the item.", async () => {
        // Arrange
        const onAddMock = jest.fn().mockName("onAdd");

        await act(async () => {
            render(
                <TodoForm isOpen={true} onAdd={onAddMock} title="test goal" />,
                { wrapper: BrowserRouter }
            );
        });
        const addButton = screen.getByTestId("onaddButton");
        // Act
        fireEvent.click(addButton);
        // Assert
        expect(onAddMock).toHaveBeenCalled(); // The method that adds the todo should be called
    });

    test("Clicking the edit button calls the method that edits the item.", async () => {
        // Arrange
        const onEditMock = jest.fn().mockName("onEdit");

        await act(async () => {
            render(
                <TodoForm
                    isOpen={true}
                    onEdit={onEditMock}
                    title="test goal"
                />,
                { wrapper: BrowserRouter }
            );
        });
        const editButton = screen.getByTestId("oneditButton");
        // Act
        fireEvent.click(editButton);
        // Assert
        const goalSaveButton = screen.getByTestId("goalSaveButton");
        expect(goalSaveButton).toBeDefined();
    });

    test("Checks text", async () => {
        await act(async () => {
            render(<Goals />, { wrapper: BrowserRouter });
        });
        const texto = screen.getByText(
            /Hoy es un buen día para plantearte una nueva meta/i
        );
        expect(texto).toBeInTheDocument;
    });

    test("Fetch goals when there is a current user", async () => {
        jest.spyOn(firebaseHooks, "useAuthState").mockReturnValue([
            { uid: "123", email: "foo@bar.com" },
            false,
        ]);
        jest.spyOn(
            goalsService,
            "fetchAllGoalsAndGroupByCategory"
        ).mockReturnValue([]);
        jest.spyOn(goalsService, "fetchAllGoals").mockReturnValue([]);
        await act(async () => {
            render(<Goals date1="2022-05-05" date2="2022-06-06" />, {
                wrapper: BrowserRouter,
            });
        });
    });
});

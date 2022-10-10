import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const { act, render } = require("@testing-library/react")
const { default: Home } = require("../pages/Home")
import * as firebaseHooks from "react-firebase-hooks/auth";
import * as userService from '../services/users.service'
import * as goalsService from "../services/goals.service";

describe('Tests en <Home/>', () => {
		
	test('Get the user information for the goals', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({uid: '123', email: 'foo@bar.com'});
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			secondds: 1000
		}}]);
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([{
			title: '123', reminder: {
			secondds: 1000
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
		
	})
})
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const { act, render } = require("@testing-library/react")
const { default: Home } = require("../pages/Home")
import * as firebaseHooks from "react-firebase-hooks/auth";
import * as userService from '../services/users.service'
import * as goalsService from "../services/goals.service";

describe('Tests en <Home/>', () => {

	beforeEach(() => {jest.clearAllMocks()})
		
	test('Get the user information for the goals', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({uid: '123', email: 'foo@bar.com'});
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
	})

	test('No expired tasks', async () => {

		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({uid: '123', email: 'foo@bar.com'});
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([]);
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
	})

	test('Goal is going to expire today', async () => {
		jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, false]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({ uid: '123', email: 'foo@bar.com' });
		 const d = new Date();
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			seconds: (d.getTime() / 1000) + (1000 * 60 * 60 * 24) 
		}}]);
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([{
			title: '123', reminder: {
			seconds: (d.getTime() / 1000)
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
	})

	test('It should not execute anything if it is loading', async () => {
			jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[{ uid: '123', email: 'foo@bar.com' }, true]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({uid: '123', email: 'foo@bar.com'});
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
	})

	test('It should not execute anything if there is no user', async () => {
			jest.spyOn(firebaseHooks, 'useAuthState').mockReturnValue(
			[null, false]);
		jest.spyOn(userService, 'getUserInfo').mockReturnValue({uid: '123', email: 'foo@bar.com'});
		jest.spyOn(goalsService, 'proximatarea').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		jest.spyOn(goalsService, 'fetchExpiredTasks').mockReturnValue([{
			title: '123', reminder: {
			seconds: 1000
		}}]);
		await act(async () => {
			render(
				<Home />,
				{ wrapper: BrowserRouter }
			)  
		})
	})
})
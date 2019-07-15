/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { formatValueWithCurrency } from '../utilities/formatting';
import { ChevronDown, ChevronUp, Circle } from 'react-feather';
import * as moment from 'moment';

const categoryWrapperStyle = css`
	position: relative;
	margin: 0.5rem auto;
	padding: 0.5rem 1rem;
	width: 88%;
	font-size: 1rem;
	text-align: left;
	color: #434348;
	box-sizing: border-box;
	border-radius: 15px;
	box-shadow: 0px 1px 6px 0px #ccc;
`
const categoryNameStyle = css`
	margin-right: 0.25rem;
	text-transform: capitalize;
`
const categoryIconStyle = css`
	position: absolute;
    right: 0.5rem;
	top: 0.5rem;
	cursor: pointer;
`
const currencySummaryStyle = css`
	margin-right: 0.25rem;
	font-size: 0.6rem;
	color: #434348;
`
const currencySummaryIconStyle = css`
	margin-right: 0.25rem;
	width: 0.5rem;
	height: 0.5rem;
	color: #7cb5ec;
`
const expenseWrapperStyle = css`
	margin: 0.5rem 0;
`
const expenseStyle = css`
	margin: 0;
	display: flex;
  	align-items: stretch;
`
const expenseValueStyle = css`
	flex-grow: 2;
`
const expenseDateStyle = css`
	flex-grow: 1;
	font-size: 0.8rem;
	text-align: right;
`
const expenseDescriptionStyle = css`
	margin: 0;
	font-size: 0.6rem;
`

const Expenses = ({ mainCategories, expenses }) => {
	const [isCategoryOpen, setCategoryOpen] = useState(null);

	return mainCategories.map(({ id, name }) => {
		const expensesFilteredByCategory = expenses.filter(expense => expense.mainCategory === name)
		let currencySummary = {}
		currencySummary[name] = {}

		expensesFilteredByCategory.forEach(({ value, currency }) => {	
			if (currencySummary[name][currency]) {
				currencySummary[name][currency] += value;
			} else {
				currencySummary[name][currency] = value;
			}
		})

		return (
			<div key={id} css={categoryWrapperStyle}>
				<div>
					<span css={categoryNameStyle}>{name}</span>
					{
						currencySummary &&
						Object.entries(currencySummary[name]).map((key, index) => (
								<span key={index} css={currencySummaryStyle}>
									<Circle css={currencySummaryIconStyle} />
									{formatValueWithCurrency(key[1], key[0])}
								</span>
							)
						)
					}
				</div>
				{ isCategoryOpen === id && <ChevronUp css={categoryIconStyle} color='#434348' onClick={() => setCategoryOpen(null)} /> }
				{ isCategoryOpen !== id && <ChevronDown css={categoryIconStyle} color='#434348' onClick={() => setCategoryOpen(id)} /> }
				{ 
					expensesFilteredByCategory &&
					isCategoryOpen === id &&
					expensesFilteredByCategory.map(({ id, value, currency, description, date }) => {

					return (
						<div key={id} css={expenseWrapperStyle}>
							<div css={expenseStyle}>
								<span css={expenseValueStyle}>
									{formatValueWithCurrency(value, currency)}
								</span>
								<span css={expenseDateStyle}>
									{moment(date).format('DD MMM YY')}
								</span>
							</div>
							<p css={expenseDescriptionStyle}>{description}</p>
						</div>
					)
				})}
			</div>
		)
	})
};

export default Expenses;

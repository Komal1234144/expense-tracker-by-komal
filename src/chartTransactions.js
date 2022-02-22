import { useSelector } from "react-redux"
import { incomeCategories , expenseCategories , resetCategories } from "./constants/categories";

export const chartTransactions=(title , allTransactions)=>{

resetCategories();
const transactionsPerType = allTransactions.filter((t)=>{
  return t.type === title
})

const total = transactionsPerType.reduce((acc , currvalue)=> {
    return acc += parseInt(currvalue.amount)
},0)

const categories = title === "Income" ? incomeCategories : expenseCategories;
const type = title=== 'Income' ? 'income' : 'expense'
transactionsPerType.forEach((t)=>{
    const category = categories.find((c)=> c.type === t.category)
    if(category){
        category.amount += parseInt(t.amount)
    }
})
const filteredCategory = categories.filter((c)=>c.amount >0)
const chartData = {
    labels : filteredCategory.map((c)=>c.type),
    datasets : [{
        data : filteredCategory.map((c)=>c.amount),
        backgroundColor : filteredCategory.map((c)=>c.color)
    }]
}

return {chartData , total , type}

}
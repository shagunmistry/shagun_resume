'use client'

import { useState } from 'react'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'
import { motion } from 'motion/react'

interface MacroResults {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

interface UserData {
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
  goal: 'maintain' | 'lose' | 'gain'
}

const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extremely_active: 1.9
}

const calculateMacros = (userData: UserData): MacroResults => {
  // Calculate BMR using Mifflin-St Jeor Equation
  const bmr = userData.gender === 'male'
    ? 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
    : 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161

  // Calculate TDEE
  let tdee = bmr * activityMultipliers[userData.activityLevel]

  // Adjust for goal
  if (userData.goal === 'lose') {
    tdee *= 0.8 // 20% deficit
  } else if (userData.goal === 'gain') {
    tdee *= 1.1 // 10% surplus
  }

  // Vegan macro distribution (optimized for plant-based nutrition)
  const protein = userData.weight * (userData.goal === 'gain' ? 2.2 : 1.8) // Higher protein for vegans
  const fat = tdee * 0.25 / 9 // 25% of calories from fat
  const carbs = (tdee - (protein * 4) - (fat * 9)) / 4 // Remaining calories from carbs
  const fiber = Math.max(25, userData.weight * 0.4) // Minimum 25g, or 0.4g per kg body weight

  return {
    calories: Math.round(tdee),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    fiber: Math.round(fiber)
  }
}

const VeganFoodSuggestions = ({ macros }: { macros: MacroResults }) => {
  const proteinFoods = [
    { name: 'Lentils', amount: `${Math.round(macros.protein * 0.3 / 9)}g`, protein: `${Math.round(macros.protein * 0.3)}g` },
    { name: 'Chickpeas', amount: `${Math.round(macros.protein * 0.25 / 8)}g`, protein: `${Math.round(macros.protein * 0.25)}g` },
    { name: 'Tofu', amount: `${Math.round(macros.protein * 0.25 / 8)}g`, protein: `${Math.round(macros.protein * 0.25)}g` },
    { name: 'Hemp Seeds', amount: `${Math.round(macros.protein * 0.2 / 31)}g`, protein: `${Math.round(macros.protein * 0.2)}g` }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <Card.Title>🥜 Protein Sources</Card.Title>
        <div className="space-y-2 mt-4">
          {proteinFoods.map((food, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-medium">{food.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{food.amount} → {food.protein} protein</span>
            </div>
          ))}
        </div>
      </Card>
      
      <Card>
        <Card.Title>🌱 Vegan Tips</Card.Title>
        <ul className="space-y-2 mt-4 text-sm">
          <li>• Combine legumes + grains for complete proteins</li>
          <li>• Include B12 supplement (2.4μg daily)</li>
          <li>• Pair iron-rich foods with vitamin C</li>
          <li>• Include omega-3 sources (chia, flax, algae)</li>
          <li>• Ensure adequate zinc from pumpkin seeds</li>
        </ul>
      </Card>
    </div>
  )
}

export default function VeganMacroCalculator() {
  const [userData, setUserData] = useState<UserData>({
    age: 30,
    weight: 70,
    height: 170,
    gender: 'female',
    activityLevel: 'moderately_active',
    goal: 'maintain'
  })
  
  const [results, setResults] = useState<MacroResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleCalculate = () => {
    const macros = calculateMacros(userData)
    setResults(macros)
    setShowResults(true)
  }

  const handleInputChange = (field: keyof UserData, value: string | number) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    setShowResults(false)
  }

  return (
    <SimpleLayout
      title="Vegan Macro Calculator"
      intro="Calculate your optimal macronutrient targets for a plant-based lifestyle. Get personalized recommendations with vegan-specific adjustments."
    >
      <div className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <Card>
            <Card.Title>Personal Information</Card.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  value={userData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  value={userData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={userData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={userData.height}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Activity Level</label>
                <select
                  value={userData.activityLevel}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value as UserData['activityLevel'])}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                  <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                  <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                  <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Goal</label>
                <select
                  value={userData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value as UserData['goal'])}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="lose">Weight Loss</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCalculate}
              className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              Calculate My Vegan Macros 🌱
            </motion.button>
          </Card>

          {showResults && results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <Card.Title>Your Vegan Macro Targets</Card.Title>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{results.calories}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Calories</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{results.protein}g</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Protein</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{results.carbs}g</div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Carbs</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{results.fat}g</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Fat</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{results.fiber}g</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Fiber</div>
                  </div>
                </div>
              </Card>
              
              <VeganFoodSuggestions macros={results} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </SimpleLayout>
  )
}
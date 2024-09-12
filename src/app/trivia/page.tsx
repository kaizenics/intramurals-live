"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  X,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LargerInteractiveTriviaGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">(
    "intro"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: 2,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      correctAnswer: 3,
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Iron"],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleNextQuestion();
    }
  }, [timeLeft, gameState]);

  const handleAnswerClick = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      setGameState("result");
    }
  };

  const startGame = () => {
    if (isLoggedIn) {
      setGameState("playing");
      setTimeLeft(15);
    } else {
      setIsModalOpen(true);
    }
  };

  const resetGame = () => {
    setGameState("intro");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <Card className="border border-white/30 bg-white/20 text-white">
          <CardHeader className="p-8">
            {gameState !== "intro" && (
              <div className="flex justify-between items-center">
                <CardTitle className="font-raceSport text-4xl font-bold">
                  Trivia Challenge
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-2xl px-4 py-2"
                >
                  Score: {score}/{questions.length}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {gameState === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h2 className="font-raceSport text-3xl md:text-5xl mb-6">
                    Trivia Challenge
                  </h2>
                  <p className="font-montserrat text-md md:text-2xl mb-8">
                    Test your knowledge with 5 exciting questions and win
                    exciting prizes.
                  </p>
                  <Button onClick={startGame} className="text-xl py-6 px-8">
                    <Play className="mr-2 h-6 w-6" /> Start Game
                  </Button>
                  <CardFooter className="py-8">
                    <Link href="/">
                      <Button
                        variant="ghost"
                        className="font-montserrat text-white hover:text-gray-300 transition-colors"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                      </Button>
                    </Link>
                  </CardFooter>
                </motion.div>
              )}
              {gameState === "playing" && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <Progress
                      value={(timeLeft / 15) * 100}
                      className="h-3 bg-black/20"
                    />
                    <p className="text-right mt-2 text-lg text-gray-400">
                      Time left: {timeLeft}s
                    </p>
                  </div>
                  <h2 className="font-montserrat text-3xl mb-8">
                    {questions[currentQuestion].question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Button
                          variant={
                            selectedAnswer === index ? "secondary" : "custom"
                          }
                          className="font-montserrat bg-black/30 w-full h-auto py-6 px-8 text-left justify-start text-xl"
                          onClick={() => handleAnswerClick(index)}
                          disabled={selectedAnswer !== null}
                        >
                          {option}
                          {selectedAnswer === index && (
                            <motion.span
                              className="ml-auto"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              {index ===
                              questions[currentQuestion].correctAnswer ? (
                                <CheckCircle className="h-8 w-8 text-green-500" />
                              ) : (
                                <XCircle className="h-8 w-8 text-red-500" />
                              )}
                            </motion.span>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              {gameState === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-4xl mb-6">Quiz Completed!</h2>
                  <p className="text-3xl mb-8">
                    Your score: {score} out of {questions.length}
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.2,
                    }}
                  >
                    {score === questions.length ? (
                      <div className="flex items-center justify-center text-green-500 mb-6">
                        <CheckCircle className="h-16 w-16 mr-4" />
                        <span className="text-3xl">Perfect Score!</span>
                      </div>
                    ) : score >= questions.length / 2 ? (
                      <div className="flex items-center justify-center text-yellow-500 mb-6">
                        <AlertCircle className="h-16 w-16 mr-4" />
                        <span className="text-3xl">Good Job!</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-red-500 mb-6">
                        <XCircle className="h-16 w-16 mr-4" />
                        <span className="text-3xl">Better Luck Next Time!</span>
                      </div>
                    )}
                  </motion.div>
                  <Button onClick={resetGame} className="text-xl py-6 px-8">
                    Play Again
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal for login warning */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 p-8 rounded-lg shadow-lg max-w-sm mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end items-center mb-4">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={24} />
                </div>
              </div>
              <h2 className="font-montserrat text-xl font-bold mb-4">
                Login Required
              </h2>
              <p className="font-montserrat mb-6">
                You need to log in to start the game. Please log in to proceed.
              </p>

              <Link href="/login">
                <Button variant={"default"} className="text-lg py-2 px-6">
                  Login
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

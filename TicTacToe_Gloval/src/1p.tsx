import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const OnePlay = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  
  const handleClick = (index:any) => {
    const squares = [...board];
    if (calculateWinner(board) || squares[index]) {
      return;
    }
    squares[index] = 'O';
    setBoard(squares);
    setXIsNext(false);
  };
  
  const renderSquare = (index:any) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handleClick(index)}>
        <Text 
          style={board[index] === 'X' ? styles.squareTextX : styles.squareTextO}>
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!xIsNext) {
      const availableSquares = board.reduce((acc, _, idx) => {
        if (!board[idx]) acc.push(idx);
        return acc;
      }, []);

      const randomSquareIndex = Math.floor(Math.random() * availableSquares.length);
      const randomSquare = availableSquares[randomSquareIndex];

      const squares = [...board];
      squares[randomSquare] = 'X';

      setBoard(squares);
      setXIsNext(true);
    }
  }, [xIsNext]);

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner === 'O' ? 'You' : 'Computer'}`
    : '';

    return (
      <View style={styles.board}>
        <View style={styles.status}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>
            Reset Game
            <MaterialCommunityIcons name="replay" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    );
};

const calculateWinner = (squares:any) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const OnePlayApp = () => {
  return (
    <View style={styles.container}>
      <OnePlay />
      <BannerAd 
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    marginTop: 50,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareTextX: {
    fontSize: 36,
    color: 'lightblue',
  },
  squareTextO: {
    fontSize: 36,
    color: 'lightpink',
  },
  status: {
    marginBottom: 10,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OnePlayApp;

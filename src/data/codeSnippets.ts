export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  title: string;
  description: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'crypto-query',
    filename: 'useCryptoPrices.ts',
    language: 'typescript',
    title: 'TanStack Query Caching & Zustand Bridge',
    description: 'Resilient live crypto polling with stale-while-revalidate and zero superfluous re-renders.',
    code: `import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCryptoStore } from './store/cryptoStore';

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

export const useCryptoPrices = (vsCurrency = 'usd') => {
  const setLivePrices = useCryptoStore((s) => s.setPrices);

  return useQuery({
    queryKey: ['crypto-prices', vsCurrency],
    queryFn: async () => {
      const { data } = await axios.get(\`\${COINGECKO_BASE}/coins/markets\`, {
        params: {
          vs_currency: vsCurrency,
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          sparkline: true,
          price_change_percentage: '1h,24h,7d'
        },
        timeout: 8000
      });
      // Atomically sync with lightweight Zustand store for high-frequency subscribers
      setLivePrices(data);
      return data;
    },
    staleTime: 60 * 1000,       // 1 minute stale buffer
    refetchInterval: 75 * 1000, // Silent background polling
    retry: 2,
    refetchOnWindowFocus: true
  });
};`
  },
  {
    id: 'java-servlet',
    filename: 'OrderProcessServlet.java',
    language: 'java',
    title: 'Java Servlet & JDBC Transaction Boundary',
    description: 'ACID-compliant order submission with atomic commit/rollback and PreparedStatement protection.',
    code: `package com.laundry.controller;

import java.io.IOException;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/api/orders/checkout")
public class OrderProcessServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\\"error\\": \\"Session expired or unauthenticated\\"}");
            return;
        }

        int userId = (Integer) session.getAttribute("userId");
        String sqlOrder = "INSERT INTO orders (user_id, status, total_amount) VALUES (?, 'RECEIVED', ?)";
        String sqlItem = "INSERT INTO order_items (order_id, service_id, weight_kg, subtotal) VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseConnectionPool.getConnection()) {
            conn.setAutoCommit(false); // Begin ACID Transaction

            try (PreparedStatement orderStmt = conn.prepareStatement(sqlOrder, Statement.RETURN_GENERATED_KEYS)) {
                orderStmt.setInt(1, userId);
                orderStmt.setBigDecimal(2, calculateCartTotal(req));
                orderStmt.executeUpdate();

                ResultSet rs = orderStmt.getGeneratedKeys();
                if (rs.next()) {
                    int orderId = rs.getInt(1);
                    batchInsertItems(conn, sqlItem, orderId, req);
                    conn.commit(); // Commit atomic transaction
                    
                    resp.setStatus(HttpServletResponse.SC_CREATED);
                    resp.getWriter().write("{\\"orderId\\": " + orderId + ", \\"status\\": \\"CONFIRMED\\"}");
                }
            } catch (SQLException ex) {
                conn.rollback(); // Rollback on any failure
                throw ex;
            }
        } catch (SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\\"error\\": \\"Database transaction failed\\"}");
        }
    }
}`
  },
  {
    id: 'mongo-pipeline',
    filename: 'taskAggregator.js',
    language: 'javascript',
    title: 'Express + MongoDB Aggregation Pipeline',
    description: 'High-speed team analytics query leveraging compound indexes and grouped metrics.',
    code: `import express from 'express';
import { Task } from '../models/Task.js';
import { authMiddleware } from '../middleware/auth.js';

export const router = express.Router();

router.get('/projects/:projectId/analytics', authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Utilize compound index { projectId: 1, status: 1 } for sub-10ms aggregation
    const analytics = await Task.aggregate([
      { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      {
        $facet: {
          byStatus: [
            { $group: { _id: '$status', count: { $sum: 1 }, totalEstHours: { $sum: '$estimatedHours' } } }
          ],
          byPriority: [
            { $group: { _id: '$priority', count: { $sum: 1 } } }
          ],
          completionRate: [
            {
              $group: {
                _id: null,
                total: { $sum: 1 },
                completed: { $sum: { $cond: [{ $eq: ['$status', 'DONE'] }, 1, 0] } }
              }
            },
            {
              $project: {
                percentage: { $multiply: [{ $divide: ['$completed', '$total'] }, 100] },
                total: 1,
                completed: 1
              }
            }
          ]
        }
      }
    ]);

    res.status(200).json({ success: true, data: analytics[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});`
  }
];

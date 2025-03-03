import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../types";
import { financeCalculations } from "../utils/financeCalulations";
import { formatCurrency } from "../utils/formatting";

interface DailySummaryProps {
  dailyTransactions: Transaction[]
  columns: number
}

const DailySummary = ({dailyTransactions, columns}:DailySummaryProps) => {
 const {income, expense, balance} =  financeCalculations(dailyTransactions)
 const isTreeColumnsLayout = columns === 3
  return (
    <Box>
      <Grid container spacing={2}>
        {/* 収入 */}
        <Grid item xs={isTreeColumnsLayout ? 4 : 6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                  textAlign="right"
                  fontWeight="fontWeightBold"
                  sx={{
                      color: (theme) => theme.palette.balanceColor.main,
                      wordBreak: "break-all"
                  }}
              >
                ¥{formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 支出 */}
        <Grid item xs={isTreeColumnsLayout ? 4 : 6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                  textAlign="right"
                  fontWeight="fontWeightBold"
                  sx={{
                      color: (theme) => theme.palette.balanceColor.main,
                      wordBreak: "break-all"
                  }}
              >
               ¥{formatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* 残高 */}
        <Grid item xs={isTreeColumnsLayout ? 4 : 12} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{
                   color: (theme) => theme.palette.balanceColor.main,
                   wordBreak: "break-all"
                }}
            >
                ¥{formatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DailySummary;

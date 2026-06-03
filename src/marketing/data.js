// All content for marketing pages lives here so pages stay templated and SEO-consistent.

export const PRODUCTS = [
  { slug:"mutual-funds", name:"Mutual Funds", icon:"📈",
    tagline:"The most accessible way for Indian investors to own a diversified portfolio.",
    summary:"Equity, debt, hybrid, ELSS, gold and international — managed by professionals, regulated by SEBI, available from ₹500/month.",
    whatItIs:[
      "A mutual fund pools money from many investors to buy a diversified portfolio of stocks, bonds or other securities. You own units of the fund; the fund's NAV moves with the underlying assets.",
      "In India, every mutual fund is regulated by SEBI and run by an AMC (Asset Management Company). You can invest as a lump sum or via a Systematic Investment Plan (SIP) starting from a few hundred rupees a month.",
      "Mutual funds come in many flavours: equity (active and passive/index), debt (liquid, short-duration, dynamic), hybrid (balanced, aggressive), ELSS (tax-saving, 3-year lock-in), gold and international.",
    ],
    keyFacts:[
      ["Minimum investment", "₹100–₹500 per SIP; ₹1,000+ lump sum"],
      ["Typical returns (assumption)", "Equity 10–12% p.a., debt 6–7% p.a. — long-run averages, not guarantees"],
      ["Lock-in", "None for most; ELSS: 3 years"],
      ["Tax (equity)", "STCG 20% (<12 months), LTCG 12.5% above ₹1.25 L/yr"],
      ["Regulator", "SEBI"],
      ["Risk level", "Low (liquid) to High (smallcap, sectoral)"],
    ],
    pros:["Diversified from day one","Professionally managed","SIP discipline","Liquid (most schemes)","Strong SEBI oversight"],
    cons:["Management fees (TER) drag returns","Regular plans pay distributor commissions","Past performance is not future","Tax differs from direct stocks","Too many funds confuse new investors"],
    whoFor:"You're a first-time investor, you want to invest small monthly amounts, or you don't have the time or interest to research individual stocks. Most Indian wealth journeys start here.",
    mistakes:[
      "Choosing regular plans when direct plans save 0.5–1% in fees every year — over 20 years that compounds enormously.",
      "Picking funds based on last 1-year returns instead of 5/10-year rolling performance and risk-adjusted return.",
      "Over-diversifying into 20+ funds and ending up with a closet index fund with high fees.",
      "Stopping SIPs during market downturns — the exact opposite of what builds wealth.",
      "Ignoring tax: ELSS, debt funds and equity funds are taxed very differently.",
    ],
    faqs:[
      ["Direct vs Regular plans — which is better?","Direct plans cut out distributor commission; you pay a lower expense ratio (usually 0.5–1% lower) and your returns compound on the saving. If you're comfortable picking funds yourself or use a fee-only adviser, direct plans almost always win."],
      ["Lumpsum or SIP?","SIP averages your purchase price across market cycles and removes the temptation to time the market. Lumpsum can do better in a sustained uptrend but worse in a sustained downturn. Most retail investors are best served by SIPs."],
      ["Active or passive (index)?","Globally, most active funds underperform their index after fees. In India, large-cap actives also struggle; mid- and small-cap actives still show some alpha. A common middle path: index funds for large-cap exposure plus a couple of high-conviction active funds for mid/small."],
      ["How are equity mutual funds taxed?","Short-term capital gains (held under 12 months) are taxed at 20%. Long-term gains above ₹1.25 L per financial year are taxed at 12.5% (rates current to FY 2025–26)."],
      ["What is ELSS?","Equity Linked Savings Scheme — an equity mutual fund eligible for Section 80C deduction (up to ₹1.5 L). 3-year lock-in. Equity-style returns with tax savings."],
      ["How many funds should I own?","Usually 3–5 well-chosen funds are enough — one large-cap/flexi, one mid/small-cap, one debt/hybrid, optionally one international and one gold."],
    ],
  },
  { slug:"pms", name:"Portfolio Management Services (PMS)", icon:"🏛️",
    tagline:"Personalised, concentrated equity portfolios for investors with ₹50 lakh+.",
    summary:"PMS gives you direct ownership of stocks in your Demat account, run by a SEBI-registered portfolio manager with a defined strategy.",
    whatItIs:[
      "A PMS is a discretionary investment service where a SEBI-registered portfolio manager builds and manages a concentrated stock portfolio on your behalf. Unlike a mutual fund, you directly own the underlying shares in your Demat account.",
      "PMS minimums are set by SEBI at ₹50 lakhs. Strategies vary widely — multicap, smallcap, focused, thematic, quant.",
      "Fees are typically a fixed component (1–2.5%) plus a performance fee above a hurdle rate.",
    ],
    keyFacts:[
      ["Minimum investment","₹50 lakhs (SEBI mandated)"],
      ["Typical returns (assumption)","Aim for benchmark + 2–5% over 5+ years; varies widely"],
      ["Lock-in","None mandated, exit loads vary"],
      ["Tax","Per individual stock — STCG / LTCG applies to each trade"],
      ["Regulator","SEBI"],
      ["Risk level","High — concentrated"],
    ],
    pros:["Direct stock ownership","Customisation possible","Tax-lot transparency","Concentrated bets can outperform","Annual portfolio reviews"],
    cons:["High minimum","Higher fees than MF","Concentration risk","Performance varies by manager","Tax handling is more complex"],
    whoFor:"You have ₹50 lakh+ of investible capital, you want a more personalised approach than mutual funds, and you can stomach concentrated bets and short-term volatility for the chance of higher long-run returns.",
    mistakes:[
      "Chasing the PMS with the best 1-year return — performance is highly cyclical by style.",
      "Ignoring fees — a 2% fixed + 20% performance fee can eat huge chunks of net returns.",
      "Treating PMS as a substitute for mutual funds rather than complementary.",
      "Not tracking the tax implications of each underlying trade.",
      "Allocating too much of total net worth to a single PMS strategy.",
    ],
    faqs:[
      ["How is PMS different from a mutual fund?","You directly own the shares (in your Demat), so you see every trade and every tax lot. MF investors own units; PMS investors own securities."],
      ["What does a PMS cost?","Most charge 1–2.5% fixed annually plus a 10–20% performance fee above a hurdle (often 8–10% p.a.)."],
      ["How are PMS gains taxed?","Each trade in the portfolio is taxed individually — STCG (20%) or LTCG (12.5%) on equity, slab rate on debt, depending on holding period."],
      ["How do I evaluate a PMS manager?","Look at 5- and 7-year rolling returns, AUM stability, fee structure, alignment of fees, the manager's style (and whether it suits the cycle), and the strategy's drawdowns in 2008/2020."],
      ["Can I customise a PMS portfolio?","Some PMSes allow exclusions (e.g., no tobacco / no liquor) and small tilts; discretionary PMSes do not allow stock-picking by the client."],
      ["How liquid is a PMS?","Most allow redemption within a few business days; some apply an exit load if redeemed within 12 months."],
    ],
  },
  { slug:"aif", name:"Alternative Investment Funds (AIF)", icon:"🧬",
    tagline:"Privately-pooled funds for sophisticated investors — Cat I, II and III.",
    summary:"AIFs invest in non-traditional strategies: private equity, venture capital, real estate, hedge funds and long-short equity. ₹1 crore minimum in India.",
    whatItIs:[
      "An AIF is a SEBI-regulated, privately-pooled investment vehicle for sophisticated investors. SEBI classifies AIFs into three categories.",
      "Category I includes social-impact funds, infrastructure funds, venture capital funds and angel funds. Category II includes private equity, debt and real-estate funds. Category III includes hedge funds and long-short equity.",
      "Minimum investment per investor is ₹1 crore (₹25 lakhs for angel funds).",
    ],
    keyFacts:[
      ["Minimum investment","₹1 crore (₹25 L for angel funds)"],
      ["Typical returns (assumption)","Highly variable; PE funds often target 15–25% IRR over 7–10 years"],
      ["Lock-in","Often 3–10 years; closed-ended for Cat I/II"],
      ["Tax","Cat I/II: pass-through; Cat III: taxed at the fund level"],
      ["Regulator","SEBI"],
      ["Risk level","High; some illiquid"],
    ],
    pros:["Access to private markets","Lower correlation to public markets","Specialised strategies","Sophisticated risk management","Sometimes outsized returns"],
    cons:["High minimums","Long lock-ins","Limited liquidity","Higher fees (often 2 and 20)","Less transparency than MF/PMS"],
    whoFor:"You have ₹1 crore+ of risk capital you don't need for 5–10 years, you understand illiquidity, and you want exposure to strategies (PE, VC, long-short) that aren't available via mutual funds.",
    mistakes:[
      "Underestimating lock-in: needing the money before exit triggers losses.",
      "Treating AIF returns as guaranteed — they are point-in-time IRRs that depend on a successful exit.",
      "Stacking multiple AIFs in the same vintage and overconcentrating on a single market cycle.",
      "Ignoring the impact of fund expenses + carry on net returns.",
      "Confusing Cat I, II and III — each has different tax and liquidity profiles.",
    ],
    faqs:[
      ["What are AIF Cat I, II and III?","Cat I: socially or economically beneficial funds (VC, infra). Cat II: PE, debt, real estate. Cat III: hedge funds and long-short."],
      ["How are AIFs taxed?","Cat I and II are pass-through: gains are taxed in your hands per asset class. Cat III is taxed at the fund level."],
      ["How do AIFs differ from PMS?","PMS gives you direct ownership of listed-stock portfolios. AIFs are pooled and may invest in private companies, debt, real estate or hedge strategies."],
      ["When does an AIF make sense vs MF or PMS?","When you want exposure to a strategy that MFs/PMSes cannot offer (PE, VC, long-short), and you can lock money up for years."],
      ["Are AIFs liquid?","Generally no. Cat I and II are usually closed-ended with 5–10 year tenors. Cat III may offer monthly liquidity."],
      ["What returns can I expect?","Highly variable. Reputed PE funds in India have historically delivered 15–25% IRR over 7–10 years; many have underperformed. These are not guarantees."],
    ],
  },
  { slug:"unlisted-shares", name:"Unlisted Shares & Pre-IPO", icon:"🔓",
    tagline:"Equity in private companies before they list — high reward, high risk, low liquidity.",
    summary:"Buy shares of pre-IPO and unlisted private companies through dedicated platforms. Long horizon, opaque valuations, real liquidity risk.",
    whatItIs:[
      "Unlisted shares are equity in private companies that are not (yet) listed on a stock exchange. Investors buy from existing shareholders (employees, early investors) or from the company directly.",
      "In India, several platforms — UnlistedArena, Stockify, Precize, Planify — facilitate access to unlisted equity in companies like NSE itself, Reliance Retail, OYO, Tata Capital, etc.",
      "Returns can be very high if the company eventually IPOs at a higher valuation, but liquidity is poor and valuations are opaque.",
    ],
    keyFacts:[
      ["Minimum investment","Often ₹50,000–₹2 lakh per company, depending on platform"],
      ["Typical returns (assumption)","Highly variable; some 0× to 5×+ over 3–7 years"],
      ["Lock-in","Effective; only liquid via secondary buyers or post-IPO"],
      ["Tax","LTCG (>24 months) 12.5% / 20% depending on indexation; STCG at slab rate"],
      ["Regulator","SEBI (intermediaries); company governance varies"],
      ["Risk level","Very high"],
    ],
    pros:["Pre-IPO upside potential","Diversification beyond listed market","Access to high-growth private firms","Lower correlation with daily market noise","Direct equity ownership"],
    cons:["Illiquid — exit only at IPO or secondary","Valuation opacity","Limited financial disclosure","Platform/intermediary risk","Tax treatment changes with listing"],
    whoFor:"You have a long horizon (5+ years), you can lose the entire amount, you allocate less than 10% of net worth to high-risk equity, and you treat unlisted investing as a small satellite — not a core holding.",
    mistakes:[
      "Sizing too large: putting more than 10% of net worth into a single unlisted name.",
      "Ignoring liquidity: assuming you can exit when you want.",
      "Buying at peak hype valuations just before a delayed or downgraded IPO.",
      "Skipping due diligence — financials, governance and dilution matter a lot.",
      "Confusing unlisted with grey-market premia or speculative IPO punts.",
    ],
    faqs:[
      ["How do I buy unlisted shares in India?","Through specialised platforms like UnlistedArena, Stockify or Precize, or via private deals brokered by intermediaries. Shares land in your Demat account once settled."],
      ["When can I sell?","Practically, only at IPO listing (lock-in often applies) or by finding a secondary buyer via the same platform."],
      ["How are unlisted-share gains taxed?","LTCG applies if held more than 24 months — currently 12.5% (or 20% with indexation for older holdings; rules evolve). STCG is at your slab rate. Once the company lists and you hold post-IPO, normal listed-equity tax kicks in."],
      ["What's the catch with valuations?","No daily NAV. Valuations are based on last-funding-round price or platform-quoted bid — often optimistic and stale."],
      ["Is there a SEBI framework?","SEBI regulates the intermediaries and IPO process. Unlisted companies themselves operate under the Companies Act."],
      ["How big should this be in my portfolio?","Conservative answer: under 5–10% of total net worth, spread across multiple names."],
    ],
  },
  { slug:"cryptocurrency", name:"Cryptocurrency", icon:"₿",
    tagline:"Digital assets — BTC, ETH and beyond — with India-specific tax rules you must understand.",
    summary:"A small allocation may make sense as portfolio diversification. India taxes crypto at 30% flat with 1% TDS and no loss set-off.",
    whatItIs:[
      "Cryptocurrencies are digital assets recorded on a blockchain. Bitcoin and Ethereum are the most established; thousands of others exist.",
      "In India, crypto is treated as a Virtual Digital Asset (VDA) under the Income Tax Act. There is no specific RBI prohibition on holding crypto, but it is not legal tender, and exchanges are regulated for AML purposes.",
      "Buy via Indian exchanges (CoinDCX, CoinSwitch, WazirX) or international ones (Coinbase, Kraken). Self-custody (hardware wallet) reduces exchange risk.",
    ],
    keyFacts:[
      ["Minimum investment","No formal minimum; start with what you can lose"],
      ["Typical returns (assumption)","Extremely volatile; multi-year drawdowns of 70–80% are common"],
      ["Lock-in","None"],
      ["Tax (India)","30% flat on gains + 1% TDS over ₹50,000/year; losses cannot offset gains in other assets"],
      ["Regulator","India: limited (AML/FIU); abroad varies"],
      ["Risk level","Very high"],
    ],
    pros:["Round-the-clock liquidity","Low correlation phases vs equity","Some monetary-policy hedge thesis (BTC)","Programmable finance (ETH) ecosystem","Easy diversification beyond Indian assets"],
    cons:["High volatility","30% flat tax with no loss set-off","Exchange / custody risk","Regulatory uncertainty","Many scams and rug-pulls"],
    whoFor:"You're comfortable with extreme volatility, you keep allocation under 5–10% of net worth, you understand self-custody basics, and you treat losses as fully possible.",
    mistakes:[
      "Over-allocating in a bull market and panic-selling in the next bear cycle.",
      "Buying altcoins on Telegram tips without research — most go to zero.",
      "Keeping everything on an exchange and ignoring custody risk.",
      "Forgetting the 1% TDS and the 30% tax — net returns are much lower than gross.",
      "Treating crypto as the same as equity for portfolio rebalancing.",
    ],
    faqs:[
      ["How is crypto taxed in India?","Gains are taxed at 30% flat regardless of holding period. 1% TDS applies on transactions above ₹50,000 per year. Losses cannot be set off against any other gains, and cannot be carried forward."],
      ["Is crypto legal in India?","Holding and trading are not prohibited. RBI has expressed concerns, but the Income Tax Act explicitly recognises Virtual Digital Assets. Treat it as legal-but-regulated for tax purposes."],
      ["Which coins should a beginner consider?","BTC and ETH dominate market cap and have the longest track records. Smaller coins carry significantly higher risk of total loss."],
      ["Indian exchange vs international?","Indian exchanges handle KYC and 1% TDS automatically — easier for tax. International exchanges may have deeper liquidity but you handle tax reporting yourself."],
      ["What about self-custody?","A hardware wallet (Ledger, Trezor) removes exchange counterparty risk. Backups and seed phrase handling are critical — lose them and the funds are unrecoverable."],
      ["How much should I allocate?","Conservative range: 1–5% of net worth. Aggressive: up to 10%. Higher than that is speculation, not investing."],
    ],
  },
  { slug:"direct-equity", name:"Direct Equity (Stocks)", icon:"📊",
    tagline:"Own pieces of individual companies — high agency, high responsibility.",
    summary:"Buying stocks directly through a Demat account lets you build a custom portfolio. Discipline and research separate winners from churners.",
    whatItIs:[
      "Direct equity means buying shares of listed companies on NSE/BSE through a Demat + trading account.",
      "You can be a long-term investor (Buffett-style buy-and-hold), a value investor, a growth investor, a momentum trader or anything in between.",
      "Most retail investors underperform a simple Nifty 50 index over 10+ years — usually due to over-trading, emotional decisions or poor stock selection.",
    ],
    keyFacts:[
      ["Minimum investment","Cost of one share — ₹100–₹50,000 depending on stock"],
      ["Typical returns (assumption)","Nifty 50: ~12% CAGR long-run; individual stocks vary wildly"],
      ["Lock-in","None"],
      ["Tax","STCG 20% (<12 months), LTCG 12.5% above ₹1.25 L/yr"],
      ["Regulator","SEBI"],
      ["Risk level","Stock-specific: very high; diversified portfolio: moderate-high"],
    ],
    pros:["Full control of holdings","No fund-manager fees","Tax-loss / gain harvesting flexibility","Dividend income","Learning compounds over time"],
    cons:["Stock selection is hard","Behaviour is the biggest enemy","Concentration risk if undiversified","Time-intensive","Most retail investors underperform indices"],
    whoFor:"You have time and interest to research companies, you can hold for 5+ years without panic-selling, and you accept that even good stock pickers go through painful drawdowns.",
    mistakes:[
      "Over-trading and racking up STCG + brokerage that eats returns.",
      "Buying tips on WhatsApp / YouTube without independent analysis.",
      "Concentrating in 1–2 stocks and ignoring position sizing.",
      "Selling winners early and holding losers (the disposition effect).",
      "Ignoring tax — harvesting losses and gains can add 0.5–1% to net returns.",
    ],
    faqs:[
      ["NSE or BSE?","NSE has higher volume on most large-caps; BSE has older listings. Both settle to the same Demat. Most brokers route to the better-price exchange automatically."],
      ["What's a Demat account?","A digital locker for your shares, mandatory for trading. CDSL and NSDL are the two depositories."],
      ["How do I evaluate a stock?","Common metrics: P/E (price to earnings), P/B (price to book), ROE (return on equity), debt/equity, and 5-year revenue and profit trends. Compare within the same sector."],
      ["Active vs passive (index)?","If you don't have time to research, an index fund or ETF (Nifty 50, Nifty Next 50) often beats a self-built portfolio over a decade — especially after fees and taxes."],
      ["How are gains taxed?","STCG (held under 12 months): 20%. LTCG (held over 12 months) above ₹1.25 L per FY: 12.5%."],
      ["How many stocks should I own?","For meaningful diversification, 15–25 stocks across sectors. Fewer than that is concentrated; more than that is a 'closet index' with extra effort."],
    ],
  },
  { slug:"insurance", name:"Insurance (Life, Health, Term)", icon:"🛡️",
    tagline:"Insurance is risk transfer — not investment. Buy term, buy health, then stop.",
    summary:"Term life and health insurance are essential. Endowment, money-back and most ULIPs mix insurance with investment poorly — usually skip them.",
    whatItIs:[
      "Insurance is a contract: you pay a premium, the insurer pays out if a defined event happens. Life insurance pays your nominees on death. Health insurance pays your hospital bills. That's the core job.",
      "Term insurance is the cheapest form of life cover: large sum assured, no maturity value if you survive. Endowment and ULIP plans mix savings with insurance — almost always worse on both counts than separating the two.",
      "Health insurance is non-negotiable in India given medical inflation of 12–14% annually.",
    ],
    keyFacts:[
      ["Term life — recommended cover","10–15× annual income, until 60–65"],
      ["Health — recommended cover","₹15–25 L base + super top-up; family floater"],
      ["Typical premiums (assumption)","Term: ₹10–25k/yr for ₹1 Cr cover at age 30; varies by health"],
      ["Lock-in","None for term/health; long lock-in for endowment/ULIP"],
      ["Tax","Section 80C (life), 80D (health) deductions; payouts often tax-free"],
      ["Regulator","IRDAI"],
    ],
    pros:["Protects your family/income against catastrophe","Tax deduction (80C, 80D)","Term insurance is cheap","Health insurance limits catastrophic medical risk","Peace of mind"],
    cons:["Endowment/ULIP returns are typically 4–6% — far below equity","ULIP charges are opaque and front-loaded","Many policies lapse before maturity — losing all premiums","Insurance is mis-sold by commission-driven agents","Claim disputes can be painful"],
    whoFor:"Anyone with dependents needs term life. Everyone in India needs health insurance. Almost no one needs endowment, money-back or most ULIPs.",
    mistakes:[
      "Buying endowment/ULIP for tax saving — the return is poor and the lock-in is long.",
      "Under-insuring: a ₹25 L cover for a ₹2 Cr income earner doesn't replace lost income.",
      "Skipping a personal health policy because employer cover exists — the day you leave, you're exposed.",
      "Ignoring riders: critical illness and accident riders cost little and add a lot of protection.",
      "Not disclosing pre-existing conditions — almost guarantees claim rejection later.",
    ],
    faqs:[
      ["How much term cover do I need?","Rule of thumb: 10–15× your annual income, until age 60–65. Adjust for existing assets and liabilities."],
      ["Term vs endowment vs ULIP?","Term is pure protection — buy it. Endowment and money-back plans are bundled and usually return 4–6%. ULIPs are unit-linked but heavily front-loaded. The 'buy term and invest the rest' strategy almost always wins."],
      ["Family floater or individual health policy?","For young families: a floater is cheaper. For older parents: individual policies often work better as floaters get expensive when the oldest member ages."],
      ["What is a super top-up?","An add-on policy that kicks in after a base sum assured is exhausted — cheap way to scale total cover to ₹50 L+ for serious illnesses."],
      ["Are insurance payouts taxed?","Term insurance death benefit: tax-free (sec 10(10D)). Endowment maturity: tax-free if premium ≤10% of sum assured (older policies have different rules). Health: claim reimbursement is not income, so not taxed."],
      ["Should I buy from an agent or online?","Online term plans are typically 20–40% cheaper than agent-sold plans because there's no commission. Use a comparison aggregator and the insurer's own website."],
    ],
  },
  { slug:"real-estate", name:"Real Estate", icon:"🏡",
    tagline:"Residential, commercial and REITs — India's most over-allocated asset class.",
    summary:"Real estate is illiquid, lumpy and tax-heavy. REITs and InvITs offer real-estate-like returns with daily liquidity and small ticket sizes.",
    whatItIs:[
      "Real estate covers residential property (a home you live in or rent out), commercial property (offices, retail), and increasingly REITs (Real Estate Investment Trusts) and InvITs that trade like stocks but represent a slice of income-producing property.",
      "Direct ownership ties up large capital and creates illiquidity. REITs (e.g., Embassy, Mindspace, Brookfield) democratise access — buy units on the exchange, get rental yield + capital appreciation.",
      "Most Indian households are over-allocated to real estate, often because of cultural preference. A financial plan should size real estate consciously, not by default.",
    ],
    keyFacts:[
      ["Minimum investment","Direct: ₹30 L+; REITs/InvITs: ₹300–₹500 per unit"],
      ["Typical returns (assumption)","Direct residential: 4–7% capital + 2–3% rental; REITs: 7–9% yield + 4–6% growth"],
      ["Lock-in","Direct: high (months to sell); REITs: liquid"],
      ["Tax","Rental: slab rate; STCG <24 months: slab; LTCG >24 months: 12.5% (or 20% indexation for older holdings)"],
      ["Regulator","RERA (developers), SEBI (REITs)"],
      ["Risk level","Direct: moderate, illiquid; REITs: moderate"],
    ],
    pros:["Tangible asset","Rental income","Inflation hedge (long-term)","Loan deductions for self-occupied / let-out","REITs add liquidity"],
    cons:["Illiquid — sale takes months","High transaction costs (stamp duty, registration, brokerage)","Maintenance & vacancy risk","Concentration risk","Returns often overstated by ignoring inflation and costs"],
    whoFor:"For a primary residence: yes, if it improves your life and you can afford the EMI. For investment property: only if it fits a deliberate allocation and you accept the illiquidity. REITs are a sensible exposure for everyone.",
    mistakes:[
      "Buying a second flat as 'investment' without modelling rental yield, vacancy, maintenance and tax — often a 4–5% return at best.",
      "Underestimating transaction costs: 8–10% round-trip on direct property.",
      "Counting your primary home as a financial asset for retirement (you have to live somewhere).",
      "Ignoring REITs — they offer real-estate exposure without the headaches.",
      "Taking a 25-year home loan without stress-testing what happens if rates rise or income falls.",
    ],
    faqs:[
      ["Should I buy or rent?","Rent if you might move within 5–7 years, if EMI exceeds 35% of take-home, or if local property yields are below 3%. Buy if you'll stay, you can comfortably afford the EMI, and the home gives you life satisfaction."],
      ["How are property capital gains taxed?","Sold within 24 months: STCG at your slab rate. Held over 24 months: LTCG at 12.5% (without indexation) or 20% with indexation for properties bought before July 2024."],
      ["What is a REIT?","A Real Estate Investment Trust — buys and operates commercial property and distributes most income to unit holders. Trades on NSE/BSE like a stock."],
      ["How is REIT income taxed?","Mix of dividend, interest and capital return — each component taxed differently. Most investors find net yield of 6–7% after tax."],
      ["What is RERA?","Real Estate (Regulation and Development) Act — mandates project registration, escrow accounts and timely delivery. Always buy RERA-registered projects from credible developers."],
      ["Loan repayment vs equity SIP — which to prioritise?","If home-loan rate (after tax deductions) is meaningfully below expected equity returns, continue the SIP and pay regular EMIs. If the after-tax rate is close to equity returns, prepayment can be a strong move."],
    ],
  },
  { slug:"gold", name:"Gold", icon:"🪙",
    tagline:"Insurance for your portfolio — 5–10% in gold smooths long-term volatility.",
    summary:"Physical, digital, SGB or gold ETF — each has trade-offs. Sovereign Gold Bonds (SGB) are the cleanest for most investors.",
    whatItIs:[
      "Gold has been money for millennia and remains a hedge against currency debasement and equity drawdowns. In India, it's also cultural.",
      "Today you can hold gold as physical jewellery/coins, digital gold (via apps), gold ETFs (exchange-traded), gold mutual funds, or Sovereign Gold Bonds (RBI-issued, 2.5% interest p.a. + capital appreciation, tax-free LTCG if held to maturity).",
      "For most investors, 5–10% gold allocation reduces portfolio volatility without dragging long-term returns much.",
    ],
    keyFacts:[
      ["Minimum investment","Physical: 1g; SGB: 1g; ETF: ₹50+"],
      ["Typical returns (assumption)","INR gold: ~9–10% CAGR over 20 years; varies"],
      ["Lock-in","SGB: 8 years (early exit possible from year 5)"],
      ["Tax","SGB: tax-free LTCG if held to maturity; ETF/MF: as per debt fund / capital gains rules"],
      ["Regulator","RBI (SGB), SEBI (ETF/MF), BIS (hallmarking)"],
      ["Risk level","Low-moderate; currency-linked"],
    ],
    pros:["Low correlation with equity","Inflation hedge","SGB pays 2.5% interest","SGB LTCG tax-free at maturity","Digital forms eliminate storage hassle"],
    cons:["No yield (physical/ETF)","Storage/making-charge costs (physical)","Volatile in short-term","Currency risk works both ways","SGB lacks daily liquidity"],
    whoFor:"Almost everyone should hold 5–10% of net worth in gold for diversification. SGB is the most efficient form for those who can lock funds for 5–8 years; ETF/MF is fine for liquidity.",
    mistakes:[
      "Buying physical gold as 'investment' — making charges and resale haircut destroy returns.",
      "Holding 30–40% of net worth in gold — it's portfolio insurance, not the engine.",
      "Confusing gold ETF (equity-like, traded daily) with gold MF (purchased at NAV) — small differences add up.",
      "Forgetting SGB's tax-free LTCG benefit when planning long-term holdings.",
      "Selling gold during equity bear markets when its diversification value is highest.",
    ],
    faqs:[
      ["Physical vs SGB vs ETF?","SGB is best for long horizons (tax-free at maturity + 2.5% interest). ETF is best for liquidity. Physical is best only for personal use, not investment."],
      ["How are SGBs taxed?","2.5% interest is taxed at your slab rate annually. Capital gains on maturity (year 8) are tax-free. Early exit (year 5+) is taxed as LTCG with indexation."],
      ["Where do I buy SGBs?","RBI issues tranches periodically — buy via your bank, demat broker or post office. Already-issued SGBs trade on NSE/BSE (often at a discount to current gold price)."],
      ["How much gold should I own?","5–10% of net worth for diversification. Higher only if you have strong macro views; lower if you're young with a long equity horizon."],
      ["Can I take a loan against gold?","Yes — banks and NBFCs offer gold loans at 8–12% interest, against physical gold or SGB pledged. Useful as short-term liquidity, dangerous as long-term financing."],
      ["What is digital gold?","Tradable gold units backed by physical gold held by the provider. Convenient but counterparty risk is real; SGB is generally cleaner."],
    ],
  },
];

export const AUDIENCES = [
  { slug:"defence-officers", name:"For Defence Officers", icon:"🎖️",
    headline:"Built for officers planning the next mission — financial independence.",
    intro:"Whether you're serving, transitioning, or retired, your financial picture has unique features: OROP pension, DSOP fund, AGIF/NGIS/AFGIS, CSD benefits, ECHS, resettlement allowance and a structured retirement at 54–60. We model all of it.",
    points:[
      ["OROP pension projection","Calculates expected lifetime pension based on rank, service and OROP revisions."],
      ["Commutation calculator","Whether you should commute pension or take the full monthly amount, modelled with real interest rates."],
      ["DSOP fund projection","Projects DSOP corpus at retirement under different contribution scenarios."],
      ["AGIF / NGIS / AFGIS","Benefits modelled into your protection stack."],
      ["Resettlement & leave encashment","Lump-sum cashflows mapped to your post-retirement goals."],
      ["CSD vs civilian","Cost comparator for cars and big-ticket items, so you make the right buy/wait decision."],
      ["ECHS vs civilian health","Gap analysis for medical cover after retirement."],
      ["Cantonment vs civilian housing","Opportunity-cost analysis on whether to live in service quarters or invest in private property."],
    ],
    cta:"Run the defence-officer financial plan",
  },
  { slug:"nri", name:"For NRIs & Global Indians", icon:"🌍",
    headline:"Plan across two tax systems, two currencies, and two retirement homes.",
    intro:"NRIs in the US, UK, UAE, Singapore and elsewhere face a uniquely complex situation: FEMA, FATCA, double-taxation treaties, NRE/NRO accounts, repatriation, and the question of whether to retire abroad or back in India. We help you think it through clearly.",
    points:[
      ["NRE/NRO/FCNR structure","Which accounts make sense for your income, savings and future repatriation."],
      ["DTAA & FATCA","How to claim treaty benefits and avoid double tax on Indian investments."],
      ["Mutual funds & PMS","Which Indian schemes are KYC-friendly for NRIs, and which jurisdictions block US-person investors."],
      ["Property in India","Buying, renting, selling — including TDS on NRI sales (20% LTCG / 30% STCG)."],
      ["Currency planning","Earning in USD/AED/GBP, investing in INR — how to balance both sides."],
      ["Repatriation & retirement","Whether to retire in your country of residence, India, or somewhere else entirely."],
      ["Estate & succession","Cross-border wills, beneficiaries and the practicalities of inheritance across jurisdictions."],
    ],
    cta:"Build my NRI wealth plan",
  },
  { slug:"hni", name:"For HNIs", icon:"👑",
    headline:"PMS, AIF, unlisted, real estate and a tax strategy that respects your time.",
    intro:"At ₹2 crore+ of investible net worth, your wealth questions shift. The right portfolio isn't just bigger SIPs — it's a structured mix of PMS, AIF, direct equity, real estate, gold and tax-loss/gain harvesting that an off-the-shelf app can't deliver.",
    points:[
      ["PMS empanelment","Curated shortlist of PMS strategies (multicap, smallcap, thematic) matched to your risk and horizon."],
      ["AIF allocation","Cat II PE / private credit / real estate as a part of your alternative allocation."],
      ["Unlisted & pre-IPO","Sized correctly as a satellite, with realistic liquidity assumptions."],
      ["Tax harvesting","Annual planning to use the ₹1.25 L LTCG exemption and book offsetting losses."],
      ["Estate & trusts","Family trusts, succession structuring and donor-advised charity planning."],
      ["Concentration risk","If most of your wealth is in one stock (ESOPs, family business), how to de-risk over time."],
      ["Personal advisory","Quarterly reviews with Col Ashish, on-demand calls, audit-ready records."],
    ],
    cta:"Schedule an HNI consultation",
  },
  { slug:"professionals", name:"For Salaried Professionals", icon:"💼",
    headline:"Mid-career, climbing fast, time-poor — let the plan keep up.",
    intro:"You're 28–45, earning well, juggling EMIs, SIPs, ESOPs, kids, parents and the next promotion. A clear financial plan stops the leaks (mis-bought insurance, idle savings, tax inefficiency) and points compounding in the right direction.",
    points:[
      ["Tax optimisation","Section 80C / 80D / 80CCD(1B) / HRA — every deduction you're entitled to, and the ones you're missing."],
      ["ESOPs & RSUs","Vesting math, AMT exposure, optimal exercise/sale timing, FBAR for global stock."],
      ["Emergency fund","6 months of expenses in a liquid fund — the unglamorous foundation."],
      ["Home loan vs SIP","Whether prepayment beats compounding for your specific rate, term and goals."],
      ["Kids' education","Mapped target corpora using realistic Indian and overseas-college inflation."],
      ["Insurance audit","Often you're over-insured for life with poor products, and under-insured for health."],
      ["Career-break readiness","Sabbatical, founding a startup, or downshifting — modelled before you decide."],
    ],
    cta:"Get my professional financial plan",
  },
];

export const BLOG_POSTS = [
  { slug:"pms-guide-2026", category:"Investing", title:"The complete guide to PMS in India for 2026",
    excerpt:"Who PMS is for, how it differs from mutual funds, what to look for in a manager, and the fees you should never ignore.",
    date:"2026-05-20", readTime:"9 min",
    body:`Portfolio Management Services occupy an interesting middle ground between mutual funds and full-service wealth management. SEBI sets the minimum at ₹50 lakhs, fees are typically a fixed 1–2.5% plus a performance fee, and you directly own the underlying stocks in your Demat account.

## Who should consider PMS?
You should consider PMS only if you have ₹50 lakhs of investible capital, you understand that concentrated portfolios swing harder than diversified ones, and you can hold for at least 5 years.

## How to evaluate a PMS manager
Look at 5- and 7-year rolling returns (not just the headline 1-year number), AUM stability, fee alignment, the manager's style (and whether that style is in or out of favour), and the worst drawdown the strategy has experienced.

## Fees: where the value is created or destroyed
A 2% fixed + 20% performance fee with a 10% hurdle sounds reasonable until you compound it across a decade. A 15% gross return becomes 11% net, which still sounds fine — until you compare to a 12% Nifty index that costs you 0.1%. The PMS has to genuinely add 3%+ net to be worth it.

## Mutual funds vs PMS
For most investors, mutual funds — direct plans — are a better starting point. PMS makes sense as a satellite when you have specific exposure or style preferences mutual funds don't cover, or when concentration is what you actually want.

## Bottom line
PMS is a sharp tool. In the right hands it can outperform; in the wrong hands it underperforms expensively. Choose the manager, not the product. Choose the fee structure that aligns interests. And review every 12 months.`,
  },
  { slug:"mutual-funds-vs-pms", category:"Investing", title:"Mutual funds vs PMS: which is right for you?",
    excerpt:"A side-by-side comparison covering minimums, fees, taxation, customisation and the practical differences that matter.",
    date:"2026-05-10", readTime:"7 min",
    body:`If you have ₹50 lakhs or more to invest in equity, you've probably wondered whether to stay in mutual funds or move some of it to a PMS. Here's the honest comparison.

## Minimums and access
Mutual funds: ₹500 SIP, no upper limit. PMS: ₹50 lakhs minimum per SEBI rules.

## Fees
Direct plan mutual funds: 0.3–1.2% total expense ratio. PMS: 1–2.5% fixed plus a performance fee (often 10–20% above a hurdle of 8–10%).

## Ownership and transparency
Mutual funds: you own units, the AMC owns the securities. PMS: you directly own the stocks in your Demat — full visibility into every trade.

## Taxation
Mutual funds: tax accrues when you redeem units. PMS: tax accrues on every trade in the portfolio. This sounds worse for PMS, but it lets you do tax-loss harvesting that mutual funds can't.

## Customisation
Mutual funds: no customisation. PMS: limited (exclusion lists, ESG screens), but the discretionary nature means you don't pick stocks yourself.

## Performance
Both vary wildly by manager. Mutual fund category averages are well documented; PMS performance disclosure is more variable.

## Verdict
For most people: mutual funds. For HNIs who want concentration, tax-lot transparency, or specific style exposure: PMS as a complement, not a replacement.`,
  },
  { slug:"aif-categories-explained", category:"Investing", title:"AIF Category I, II, III: a plain-English explanation",
    excerpt:"The three categories of Alternative Investment Funds — what they invest in, who can invest, how they're taxed.",
    date:"2026-04-28", readTime:"6 min",
    body:`SEBI classifies Alternative Investment Funds (AIFs) into three categories. Here's what each one actually means.

## Category I
Funds with positive externalities — venture capital, angel funds, infrastructure funds, social-impact funds. They invest in startups, social enterprises, and infrastructure projects.

## Category II
The largest bucket — private equity, debt funds, real-estate funds. Closed-ended, typically 5–10 year tenors. Pooled in for invested capital, distributions when investments exit.

## Category III
Hedge funds and long-short equity. Can use leverage and derivatives. Open- or closed-ended.

## Minimum investment
₹1 crore per investor for all categories. ₹25 lakhs for angel funds (a sub-class of Cat I).

## Taxation
Cat I and II are pass-through: gains taxed in your hands per asset class. Cat III is taxed at the fund level — convenient but less tax-efficient.

## When does AIF make sense?
When you want exposure to a strategy mutual funds and PMS cannot offer — private companies, infrastructure debt, hedge strategies — and you can lock money up for years.`,
  },
  { slug:"why-i-left-the-army", category:"Defence", title:"Why I left a 20-year military career to start a wealth firm",
    excerpt:"The founder story — and why financial planning for fellow officers became the obvious next mission.",
    date:"2026-04-15", readTime:"5 min",
    body:`I spent over two decades in uniform. In that time I watched too many colleagues — sharp, disciplined, dedicated people — make avoidable financial mistakes. Endowment policies bought at the wrong time. Real estate over-allocations. Pensions commuted on autopilot. DSOP balances left to drift.

## The gap
The financial advice that exists in India is either generic (too broad to be useful) or boutique (too expensive for most). Officers transitioning out of service get neither.

## The mission
WealthWise is the platform I wish my younger self had. AI-powered planning that adapts to your actual situation — military pension, DSOP, AGIF, resettlement — and gives you a structured plan in minutes.

## Why now
The tools have finally caught up to the problem. Claude and similar AI models can do the heavy lifting on personalised analysis. Supabase and modern web infrastructure mean a small team can ship a serious product. And the audience — Indian HNIs, defence officers, NRIs — has been under-served for too long.

## The next mission
This is mission planning, not selling. Try the AI Wealth Planner, run your numbers, see what the plan looks like. If it helps, share it.`,
  },
  { slug:"ltcg-125-lakh", category:"Tax", title:"The ₹1.25 lakh LTCG exemption: the most under-used tax tool in India",
    excerpt:"Every Indian investor with equity gets ₹1.25 L of long-term capital gains tax-free each year. Most don't use it.",
    date:"2026-04-02", readTime:"6 min",
    body:`SEBI rules let every Indian taxpayer enjoy ₹1.25 lakh of long-term capital gains on listed equity and equity mutual funds completely tax-free, every financial year. Use it or lose it.

## How "gain harvesting" works
Sell units that have appreciated, book the gain (up to ₹1.25 L), and immediately buy them back. Your cost basis resets to the new (higher) price. You've effectively converted future taxable gains into already-realised tax-free gains.

## Why most people don't do it
Three reasons. They don't know the exemption exists. They forget about it until March. They don't have a system to identify which lots to sell.

## The math
Skipping this for 20 years on a ₹50 L equity portfolio that compounds at 12% leaves serious tax on the table — easily ₹10–15 lakhs of cumulative tax savings unused.

## What to watch out for
Don't trigger STCG by accident — only LTCG (units held over 12 months) qualifies. Track your year-to-date realised gains so you don't blow past the ₹1.25 L threshold and trigger 12.5% tax on the excess.

## The WealthWise way
Our tax-harvesting engine flags eligible lots through the year and triggers a March sprint so the full ₹1.25 L is used cleanly.`,
  },
  { slug:"nri-investing-rulebook", category:"NRI", title:"NRI investing in India: the 2026 rulebook",
    excerpt:"NRE vs NRO, FEMA basics, mutual funds & PMS access for US/UK/UAE NRIs, tax treaties — the things you'll actually be asked.",
    date:"2026-03-22", readTime:"10 min",
    body:`Investing in India as an NRI has gotten easier — and more complex at the same time. The basics every NRI investor should know.

## Account structure
NRE: fully repatriable, foreign-income source, tax-free interest in India. NRO: for India-source income, partially repatriable, interest taxable. FCNR: foreign-currency deposits, repatriable, term deposits only.

## Mutual funds and PMS
Most Indian mutual funds accept NRIs. A handful block US-person and Canadian-person investors due to FATCA compliance burden. PMS rules vary by manager.

## Real estate
NRIs can buy residential and commercial property freely. Agricultural land is restricted. TDS on sale is 20% LTCG / 30% STCG of the gross sale value — file ITR to claim refund on actual gains.

## DTAA and FATCA
India has double-taxation avoidance treaties with most major jurisdictions. Use Form 10F + Tax Residency Certificate to claim treaty benefits.

## Currency planning
Earning in USD/GBP/AED and investing in INR creates a currency-exposure dimension. Decide consciously: are you a net rupee saver who'll retire in India, or a net dollar saver who'll retire abroad?

## The advice
Most NRIs over-complicate this. Get the account structure right, file the right forms once, automate SIPs from NRE accounts, and let it compound.`,
  },
];

export const GLOSSARY = [
  ["AIF","Alternative Investment Fund — SEBI-regulated pooled investment vehicle (Cat I, II, III) with a ₹1 crore minimum, used for PE, VC, hedge and real-estate strategies."],
  ["AMC","Asset Management Company — the firm that manages a mutual fund. Examples: HDFC AMC, ICICI Prudential, Nippon India."],
  ["AMFI","Association of Mutual Funds in India — industry body that registers mutual fund distributors (ARN code)."],
  ["AUM","Assets Under Management — total market value of investments a fund or manager handles."],
  ["CAGR","Compound Annual Growth Rate — the smoothed annual rate at which an investment grew, accounting for compounding."],
  ["CAS","Consolidated Account Statement — a monthly statement from CAMS/KFintech listing all your mutual fund holdings across AMCs."],
  ["CDSL/NSDL","Central Depository Services / National Securities Depository — the two depositories that hold Indian Demat accounts."],
  ["Demat","Dematerialised account — a digital locker for your shares, bonds and mutual fund units."],
  ["DPDP","Digital Personal Data Protection Act 2023 — India's data privacy law governing how companies collect and process personal data."],
  ["DSOP","Defence Services Officers Provident Fund — voluntary retirement savings scheme for military officers, similar to PPF."],
  ["DTAA","Double Taxation Avoidance Agreement — bilateral tax treaty preventing income from being taxed in two countries."],
  ["EPF","Employees' Provident Fund — mandatory retirement savings for salaried employees in India (12% of basic salary)."],
  ["ELSS","Equity Linked Savings Scheme — tax-saving equity mutual fund with 3-year lock-in, eligible for 80C deduction."],
  ["ETF","Exchange-Traded Fund — a fund that tracks an index and trades like a stock on NSE/BSE."],
  ["FATCA","Foreign Account Tax Compliance Act — US law requiring foreign financial institutions to report US-person accounts."],
  ["FEMA","Foreign Exchange Management Act — Indian law governing cross-border transactions and NRI investments."],
  ["FIRE","Financial Independence, Retire Early — the goal of accumulating a corpus 25× annual expenses so work becomes optional."],
  ["IRR","Internal Rate of Return — annualised return of an investment with irregular cashflows, common in PMS/AIF reporting."],
  ["LTCG","Long-Term Capital Gains — gains on equity held over 12 months (taxed at 12.5% above ₹1.25 L/yr) or property over 24 months."],
  ["NAV","Net Asset Value — per-unit value of a mutual fund, calculated daily."],
  ["NPS","National Pension System — government retirement scheme with equity/debt allocation, additional ₹50,000 deduction under 80CCD(1B)."],
  ["NRE","Non-Resident External — INR account for NRIs, fully repatriable, tax-free interest in India."],
  ["NRO","Non-Resident Ordinary — INR account for NRIs to manage India-source income; interest taxable."],
  ["OROP","One Rank One Pension — defence pension scheme where personnel of the same rank with equal service get equal pension."],
  ["PMS","Portfolio Management Services — SEBI-registered service managing a concentrated stock portfolio for ₹50 L+ investors."],
  ["PPF","Public Provident Fund — government-backed 15-year savings scheme with 80C deduction and tax-free interest."],
  ["REIT","Real Estate Investment Trust — exchange-listed trust that owns income-producing commercial property and distributes most rental income to investors."],
  ["RIA","Registered Investment Adviser — SEBI-registered adviser who can give personalised investment advice for a fee."],
  ["SEBI","Securities and Exchange Board of India — the primary regulator for the securities market in India."],
  ["SGB","Sovereign Gold Bond — RBI-issued bond denominated in grams of gold, pays 2.5% interest, tax-free LTCG at maturity."],
  ["SIP","Systematic Investment Plan — automated monthly investment into a mutual fund."],
  ["STCG","Short-Term Capital Gains — gains on equity held under 12 months (taxed at 20%) or property under 24 months."],
  ["SWR","Safe Withdrawal Rate — the percentage of a corpus that can be withdrawn annually without depleting it; commonly 4%."],
  ["TDS","Tax Deducted at Source — tax withheld at the time a payment is made; common on rent, interest, NRI transactions."],
  ["TER","Total Expense Ratio — annual cost of running a mutual fund, expressed as a percentage of AUM."],
  ["ULIP","Unit Linked Insurance Plan — a bundled insurance + investment product; usually has front-loaded charges."],
  ["XIRR","Extended Internal Rate of Return — IRR for irregular cashflows; the standard for evaluating SIP returns."],
];

export const CALCULATORS = [
  { slug:"sip", name:"SIP Calculator", icon:"📅", desc:"How much will your monthly SIP grow into?" },
  { slug:"lumpsum", name:"Lumpsum Calculator", icon:"💎", desc:"Project a one-time investment over years." },
  { slug:"retirement", name:"Retirement Corpus", icon:"🏖️", desc:"What corpus do you need to retire at your target age?" },
  { slug:"fire", name:"FIRE Number", icon:"🕊️", desc:"25× annual expenses — when work becomes optional." },
  { slug:"tax-harvest", name:"Tax Harvesting Estimator", icon:"💸", desc:"Annual tax saved by using the ₹1.25 L LTCG exemption." },
  { slug:"nri-tax", name:"NRI Tax Calculator", icon:"🌍", desc:"Quick estimate of TDS and tax on India investments." },
  { slug:"emi", name:"EMI Calculator", icon:"🏦", desc:"Monthly payment and total interest on a loan." },
];

export const DOWNLOADS = [
  { slug:"professional-health-check", name:"The 15-minute Financial Health Check for Professionals",
    desc:"A printable one-pager to score your current financial health across income, expenses, debt, investments, insurance and goals." },
  { slug:"defence-transition-planner", name:"The Defence Officer's Transition Financial Planner",
    desc:"From last day in uniform to a settled post-service life — pension, DSOP, AGIF, resettlement, ECHS, and the choices that matter." },
  { slug:"nri-cheatsheet", name:"NRI Investing in India: 2026 Cheat Sheet",
    desc:"NRE/NRO, FEMA, FATCA, DTAA, mutual fund access, real estate, repatriation — the essentials on one A4 sheet." },
  { slug:"pms-empanelment", name:"PMS Empanelment: How to Evaluate a Manager",
    desc:"The 12-question checklist to use before signing up for any PMS in India." },
];

export const SOCIALS = [
  { name:"YouTube", href:"https://www.youtube.com/@AurisWealth" },
  { name:"X (Twitter)", href:"https://x.com/auriswealth" },
  { name:"Instagram", href:"https://www.instagram.com/auriswealth/" },
  { name:"LinkedIn", href:"https://www.linkedin.com/" },
  { name:"Facebook", href:"https://www.facebook.com/profile.php?id=61576522393432" },
];

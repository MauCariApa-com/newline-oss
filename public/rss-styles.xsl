<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;600;700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600&amp;family=Google+Sans+Text:wght@400;500;600&amp;display=swap" rel="stylesheet" />
        <style>
          body {
            font-family: "Google Sans", "Google Sans Text", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          }
          
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            text-align: center;
          }
          
          .header h1 {
            margin: 0 0 0.5rem 0;
            font-size: 2rem;
            font-weight: 700;
            font-family: "Newsreader", serif;
          }
          
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 1.1rem;
          }
          
          .info-box {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .info-box h2 {
            margin-top: 0;
            color: #4f46e5;
            font-size: 1.25rem;
          }
          
          .feed-url {
            background: #f3f4f6;
            padding: 0.75rem;
            border-radius: 6px;
            font-family: monospace;
            word-break: break-all;
            border: 1px solid #d1d5db;
          }
          
          .articles {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .article {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .article:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          
          .article h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.25rem;
            font-family: "Newsreader", serif;
            font-weight: 600;
          }
          
          .article h3 a {
            color: #1f2937;
            text-decoration: none;
          }
          
          .article h3 a:hover {
            color: #4f46e5;
          }
          
          .article-meta {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
          }
          
          .article-description {
            color: #4b5563;
            line-height: 1.6;
          }
          
          .tags-container {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .category {
            display: inline-block;
            background: #4f46e5;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: none;
          }
          
          .footer {
            text-align: center;
            margin-top: 2rem;
            padding: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
          }
          
          .footer a {
            color: #4f46e5;
            text-decoration: none;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 640px) {
            body {
              padding: 10px;
            }
            
            .header {
              padding: 1.5rem;
            }
            
            .header h1 {
              font-size: 1.5rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
        </div>
        
        <div class="info-box">
          <h2>📡 RSS Feed</h2>
          <p>Ini adalah RSS feed dari <strong><xsl:value-of select="/rss/channel/title"/></strong>. RSS feed memungkinkan Anda untuk mengikuti update artikel terbaru menggunakan RSS reader seperti Feedly, Inoreader, atau aplikasi RSS lainnya.</p>
          
          <h3>🔗 URL Feed:</h3>
          <div class="feed-url">
            <xsl:value-of select="/rss/channel/link"/>/rss.xml
          </div>
          
          <h3>📱 Cara Menggunakan:</h3>
          <ol>
            <li>Copy URL feed di atas</li>
            <li>Buka RSS reader favorit Anda</li>
            <li>Tambahkan feed baru dengan URL tersebut</li>
            <li>Nikmati artikel terbaru langsung di RSS reader Anda!</li>
          </ol>
        </div>
        
        <div class="articles">
          <xsl:for-each select="/rss/channel/item">
            <div class="article">
              <h3>
                <a href="{link}" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              
              <div class="article-meta">
                <xsl:variable name="pubDate" select="pubDate" />
                <xsl:variable name="day" select="substring($pubDate, 6, 2)" />
                <xsl:variable name="monthName" select="substring($pubDate, 9, 3)" />
                <xsl:variable name="year" select="substring($pubDate, 13, 4)" />
                <xsl:variable name="month">
                  <xsl:choose>
                    <xsl:when test="$monthName = 'Jan'">01</xsl:when>
                    <xsl:when test="$monthName = 'Feb'">02</xsl:when>
                    <xsl:when test="$monthName = 'Mar'">03</xsl:when>
                    <xsl:when test="$monthName = 'Apr'">04</xsl:when>
                    <xsl:when test="$monthName = 'May'">05</xsl:when>
                    <xsl:when test="$monthName = 'Jun'">06</xsl:when>
                    <xsl:when test="$monthName = 'Jul'">07</xsl:when>
                    <xsl:when test="$monthName = 'Aug'">08</xsl:when>
                    <xsl:when test="$monthName = 'Sep'">09</xsl:when>
                    <xsl:when test="$monthName = 'Oct'">10</xsl:when>
                    <xsl:when test="$monthName = 'Nov'">11</xsl:when>
                    <xsl:when test="$monthName = 'Dec'">12</xsl:when>
                    <xsl:otherwise><xsl:value-of select="$monthName"/></xsl:otherwise>
                  </xsl:choose>
                </xsl:variable>
                📅 <xsl:value-of select="concat($day, '/', $month, '/', $year)"/>
                <xsl:if test="author">
                  • ✍️ <xsl:value-of select="author"/>
                </xsl:if>
              </div>
              
              <div class="article-description">
                <xsl:value-of select="description"/>
              </div>
              
              <xsl:if test="category">
                <div class="tags-container">
                  <xsl:for-each select="category">
                    <span class="category">
                      <xsl:value-of select="."/>
                    </span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
        
        <div class="footer">
          <p>
            © <xsl:value-of select="substring(/rss/channel/lastBuildDate, 13, 4)"/>&#160;
            <a href="{/rss/channel/link}" target="_blank">
              <xsl:value-of select="/rss/channel/title"/>
            </a>
          </p>
          <p style="margin-top: 0.5rem;">
            <a href="{/rss/channel/link}/rss.xml" target="_blank">RSS Feed</a>
            • 
            <a href="{/rss/channel/link}/sitemap.xml" target="_blank">Sitemap</a>
          </p>
          <p>
            <small>
              Feed ini diperbarui secara otomatis setiap kali ada artikel baru. 
              Terakhir diperbarui: <xsl:value-of select="substring(/rss/channel/lastBuildDate, 1, 25)"/>
            </small>
          </p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
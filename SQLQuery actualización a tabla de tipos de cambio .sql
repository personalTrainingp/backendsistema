USE [data]
GO
/****** Object:  Table [dbo].[tb_tipocambios]    Script Date: 10/12/2024 5:53:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

 --drop table [dbo].[tb_tipocambios];

CREATE TABLE [dbo].[tb_tipocambios](
	[id] [int] NOT NULL IDENTITY(1, 1),
	[precio_compra] [nvarchar](6) NULL,
	[precio_venta] [nvarchar](6) NULL,
	[moneda] [nvarchar](5) NULL,
	[fecha] [nvarchar](45) NULL,
	[flag] [bit] NULL,
	[createdAt] [datetimeoffset](7) NOT NULL,
	[updatedAt] [datetimeoffset](7) NOT NULL
) ON [PRIMARY]
GO
INSERT [dbo].[tb_tipocambios] ( [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.738', N'USD', N'2024-01-04', 1, CAST(N'2024-08-22T10:02:47.9400000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:02:47.9400000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] ( [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.718', N'USD', N'2024-01-17', 1, CAST(N'2024-08-22T10:03:24.5633333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:03:24.5633333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES (N'', N'3.742', N'USD', N'2024-01-19', 1, CAST(N'2024-08-22T10:03:46.3433333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:03:46.3433333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.742', N'USD', N'2024-01-20', 1, CAST(N'2024-08-22T10:04:05.6100000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:04:05.6100000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.868', N'USD', N'2024-02-10', 1, CAST(N'2024-08-22T10:04:39.2500000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:04:39.2500000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.883', N'USD', N'2024-02-14', 1, CAST(N'2024-08-22T10:04:57.1666667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:04:57.1666667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.726', N'USD', N'2024-03-08', 1, CAST(N'2024-08-22T10:05:32.0333333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:05:32.0333333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.707', N'USD', N'2024-04-13', 1, CAST(N'2024-08-22T10:09:42.5533333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:09:42.5533333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.702', N'USD', N'2024-04-22', 1, CAST(N'2024-08-22T10:11:46.4433333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:11:46.4433333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.726', N'USD', N'2024-05-06', 1, CAST(N'2024-08-22T10:12:10.8266667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:12:10.8266667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.728', N'USD', N'2024-05-15', 1, CAST(N'2024-08-22T10:12:34.5533333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:12:34.5533333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.733', N'USD', N'2024-05-22', 1, CAST(N'2024-08-22T10:12:59.5400000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:12:59.5400000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.739', N'USD', N'2024-05-27', 1, CAST(N'2024-08-22T10:13:28.6100000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:13:28.6100000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.741', N'USD', N'2024-06-03', 1, CAST(N'2024-08-22T10:14:42.0566667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:14:42.0566667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.825', N'USD', N'2024-06-28', 1, CAST(N'2024-08-22T10:15:01.1500000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:15:01.1500000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.837', N'USD', N'2024-07-01', 1, CAST(N'2024-08-22T10:15:26.0866667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:15:26.0866667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.833', N'USD', N'2024-07-03', 1, CAST(N'2024-08-22T10:15:49.1700000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:15:49.1700000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.771', N'USD', N'2024-07-12', 1, CAST(N'2024-08-22T10:16:42.1033333+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:16:42.1033333+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.74', N'USD', N'2024-07-15', 1, CAST(N'2024-08-22T10:17:10.3866667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:17:10.3866667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.733', N'USD', N'2024-07-16', 1, CAST(N'2024-08-22T10:17:24.8066667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:17:24.8066667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'', N'3.778', N'USD', N'2024-07-25', 1, CAST(N'2024-08-22T10:17:48.2000000+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:17:48.2000000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES (N'', N'3.742', N'USD', N'2024-07-31', 1, CAST(N'2024-08-22T10:18:02.6666667+00:00' AS DateTimeOffset), CAST(N'2024-08-22T10:18:02.6666667+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES (N'3.729', N'3.74', N'USD', N'2024-08-05', 1, CAST(N'2024-08-28T22:15:13.1000000+00:00' AS DateTimeOffset), CAST(N'2024-08-28T22:15:13.1000000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'3.746', N'3.75', N'USD', N'2024-08-14', 1, CAST(N'2024-08-28T22:15:55.8500000+00:00' AS DateTimeOffset), CAST(N'2024-08-28T22:15:55.8500000+00:00' AS DateTimeOffset))
GO
INSERT [dbo].[tb_tipocambios] (  [precio_compra], [precio_venta], [moneda], [fecha], [flag], [createdAt], [updatedAt]) VALUES ( N'3.74', N'3.748', N'USD', N'2024-08-28', 1, CAST(N'2024-08-28T22:16:26.3966667+00:00' AS DateTimeOffset), CAST(N'2024-08-28T22:16:26.3966667+00:00' AS DateTimeOffset))
GO

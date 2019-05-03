/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50528
Source Host           : 127.0.0.1:3306
Source Database       : restful_crud

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-03-05 10:41:58
*/

/*数据库重新排序命令  alter table question AUTO_INCREMENT=1;*/

alter table article AUTO_INCREMENT=1;

-- SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
-- DROP TABLE IF EXISTS `article`;
-- CREATE TABLE `article` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `title` varchar(255) DEFAULT NULL,
--   `content` varchar(600) DEFAULT NULL,
--   `author` varchar(255) DEFAULT NULL,
--   `openid` varchar(255) DEFAULT NULL,
--   `nickName` varchar(255) DEFAULT NULL,
--   `avatarUrl` varchar(255) DEFAULT NULL,
--   `described` varchar(255) DEFAULT NULL,
--   `wechat` varchar(255) DEFAULT NULL,
--   `qq` varchar(255) DEFAULT NULL,
--   `sign` varchar(255) DEFAULT NULL,
--   `style` varchar(255) DEFAULT NULL,
--   `school` varchar(255) DEFAULT NULL,
--   `hobby` varchar(255) DEFAULT NULL,
--   `fac1` varchar(255) DEFAULT NULL,
--   `fac2` varchar(255) DEFAULT NULL,
--   `fac3` varchar(255) DEFAULT NULL,
--   `fac4` varchar(255) DEFAULT NULL,
--   `fac5` varchar(255) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
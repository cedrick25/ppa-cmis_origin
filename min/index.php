<?php
/**
 * Sets up MinApp controller and serves files
 * 
 * DO NOT EDIT! Configure this utility via config.php and groupsConfig.php
 * 
 * @package Minify
 */

/* Behind Nginx Proxy Manager, TLS is terminated upstream — force HTTPS context
 * so CSS/JS URI rewriting does not emit http:// mixed-content URLs. */
$host = isset($_SERVER['HTTP_HOST']) ? strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'])) : '';
$https_hosts = array(
	'eppcmis.probation.gov.ph',
	'stg-eppcmis.probation.gov.ph',
	'cmis.probation.gov.ph',
	'rpxy.probation.gov.ph',
);
$from_proxy = isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] === '192.168.1.240';
$is_https = (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off')
	|| (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower((string) $_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https')
	|| in_array($host, $https_hosts, TRUE)
	|| $from_proxy;
if ($is_https) {
	$_SERVER['HTTPS'] = 'on';
	$_SERVER['SERVER_PORT'] = '443';
	$_SERVER['HTTP_X_FORWARDED_PROTO'] = 'https';
}

$app = (require __DIR__ . '/bootstrap.php');
/* @var \Minify\App $app */

$app->runServer();

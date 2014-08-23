<?php
    // register main nav menu
    if (function_exists('register_nav_menu')) {
            register_nav_menu('main', 'Main navigation');
    }

    // load custom js
    function register_custom_script() {
        wp_enqueue_script(
            'custom-script',
            get_stylesheet_directory_uri() . '/js/script.js',
            array( 'jquery' )
        );
    }

    add_action( 'wp_enqueue_scripts', 'register_custom_script' );

    // add projects custom post type
    function register_projects_post_type() {
        $labels = array(
            'name' => 'Projects',
            'singular_name' => 'Project',
            'add_new' => 'Add new project',
            'add_new_item' => 'Add new project',
            'edit_item' => 'Edit project',
            'new_item' => 'New project',
            'all_items' => 'All projects',
            'view_item' => 'View projects',
            'search_item' => 'Search projects',
            'not_found' => 'No project(s) found.',
            'not_found_in_trash' => 'No projects found in the trash.',
            'parent_item_colon' => '',
            'menu_name' => 'Projects'   
        );

        $projects_args = array(
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'author', 'thumbnail', 'comments'),
            'labels' => $labels,
            'capability_type' => 'post',
            'taxonomies' => array('post_tag')
        );

        register_post_type('projects', $projects_args);
    }

    add_action('init', 'register_projects_post_type');
?>
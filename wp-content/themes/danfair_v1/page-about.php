<?php 
    get_header();
    the_post();
?>
    <section class="page-sub-header about-bg">
        <div class="page-sub-header__text max-width-wrapper">
            <h1><?php the_title(); ?></h1>
        </div>
    </section>
    <section class="page-content about-section">
        <div class="content-wrapper max-width-wrapper">
            <h2>Meet me</h2> 
            <div class="page-content__content-left">
                <?php the_content(); ?>
                <h3>What I Enjoy</h3>
                <?php the_field("what-i-enjoy"); ?>
                <h3>Skills</h3>
                <?php the_field("skills-intro"); ?>
                <div class="about-section__skills-bar-chart">
                    <div class="skills-bar-chart__bar orange-bar html"><p>HTML5</p></div>
                    <div class="skills-bar-chart__bar orange-bar css"><p>CSS3</p></div>
                    <div class="skills-bar-chart__bar blue-bar js"><p>JS/JQUERY</p></div>
                    <div class="skills-bar-chart__bar blue-bar ps"><p>PHOTOSHOP</p></div>
                    <div class="skills-bar-chart__bar blue-bar wp"><p>WORDPRESS DEV</p></div>
                    <div class="skills-bar-chart__bar blue-bar php"><p>PHP/MYSQL</p></div>
                </div>
            </div>
            <aside class="sidebar">
                <img src="<?php echo bloginfo('stylesheet_directory'); ?>/img/headshot.png" alt="Dan Fair" class="about-section__headshot">
                <div class="about-section__quick-facts">
                    <h4>Quick facts</h4>
                    <p>Semi-interesting fact about me</p>
                    <p>Semi-interesting fact about me</p>
                    <p>Semi-interesting fact about me</p>
                    <p>Semi-interesting fact about me</p>
                    <a href="<?php bloginfo('wpurl') ?>/contact" class="btn btn--orange">Contact me<div class="btn__arrow black right"></div></a>
                </div>
            </aside>
        </div><!-- end of content-wrapper -->
    </section>
<?php get_footer(); ?>